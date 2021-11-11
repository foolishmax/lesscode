import { ajax } from "@transquant/utils";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import React, { useEffect, useRef } from "react";
import "./index.less";

const value = `import banana


class Monkey:
    # Bananas the monkey can eat.
    capacity = 10
    def eat(self, n):
        """Make the monkey eat n bananas!"""
        self.capacity -= n * banana.size

    def feeding_frenzy(self):
        self.eat(9.25)
        return "Yum yum"`;

function Home() {
  const monacoRef = useRef(null);

  useEffect(() => {
    if (!monacoRef) return;
    const model = monaco.editor.createModel(value, "python");
    const editor = monaco.editor.create(monacoRef.current!, { model });

    editor.addCommand(monaco.KeyCode.Tab, function (e) {
      console.log("tab", e);
    });

    editor.onDidChangeModelContent(() => {
      const _value = editor.getValue();

      console.log(_value);
    });
  }, []);

  const onClick = () => {
    ajax({
      url: "/foo/user/libo",
    })
      .then((_data) => {
        console.log("data", _data);
      })
      .catch(() => {
        console.log("error");
      });
  };

  return (
    <>
      <div className="monaco-wrapper" style={{ display: "none" }}>
        <div ref={monacoRef} className="monaco" />
      </div>
      <button type="button" onClick={onClick}>
        点击发送请求
      </button>
    </>
  );
}

export default Home;
