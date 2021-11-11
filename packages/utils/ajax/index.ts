import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type Callback = (data: any) => void | string;

type Error = Callback;
type Success = Callback;

export type ResData = {
  /**
   * 成功状态码: 200
   * 失败状态码: 其他
   */
  code: number;
  message?: string;
  data: any;
};

export interface AjaxRequestConfig extends AxiosRequestConfig {
  /**
   * 请求成功后，显示的自定义成功信息，常用于操作成功后的提示
   */
  success?: Success;
  /**
   * 请求失败
   * boolean: 是否显示后端返回的错误信息
   * string: 显示自定义的错误信息
   * Function: 自行控制错误
   */
  error?: Error;
  /**
   * 副作用函数，在请求成功后失败时执行，可用于清除状态，如loading
   */
  effect?: (success: boolean) => void;
}

export default function ajax(config: AjaxRequestConfig) {
  const {
    url,
    data,
    success,
    headers = {},
    error,
    effect = () => {},
    ...axiosConfig
  } = config;

  // 当请求数据为FormData类型时，自动设置Content-Type为multipart/form-data
  if (data instanceof FormData) {
    headers["Content-Type"] = "multipart/form-data";
  }

  const req = axios({ url, data, headers, ...axiosConfig });

  return req
    .then((res: AxiosResponse<ResData>) => {
      const { code, data: _data } = res.data;

      if (code === 0 || res.status === 200) {
        effect(true);

        if (typeof success === "function") {
          success(_data || res.data);
        }

        return Promise.resolve(data || res.data);
      }

      if (code) {
        return Promise.reject(_data);
      }
    })
    .catch((e) => {
      effect(false);

      if (typeof error === "function") {
        error(e);

        return Promise.resolve();
      }

      return Promise.reject(e);
    });
}
