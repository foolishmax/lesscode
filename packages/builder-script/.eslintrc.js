const path = require('path');

const dir = path.resolve(process.cwd(), './');
const isLintEnv = process.env.NODE_ENV === 'lint';

const noUsedVarsRules = {
  "vars": "all",
  "args": "after-used",
  "ignoreRestSiblings": true,
  "argsIgnorePattern": "^_"
};

module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'prettier/react',
  ],
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
    es6: true,
  },
  settings: {
    react: {
      version: '16.13.1',
    },
    'import/resolver': {
      node: {
        paths: [dir],
        moduleDirectory: path.resolve(__dirname, '../../node_modules'),
        extensions: ['.ts', '.tsx']
      }
    }
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'babel', 'jest', 'prettier', '@typescript-eslint', 'react-hooks', 'unicorn'],
  // https://github.com/typescript-eslint/typescript-eslint/issues/46#issuecomment-470486034
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 2,
        'no-use-before-define': ['error', { 'functions': false }],
        'prettier/prettier': [1],
        "no-unused-vars": ["error", noUsedVarsRules],
        '@typescript-eslint/no-unused-vars': ["error", noUsedVarsRules]
      },
    },
  ],
  rules: {
    'react/jsx-one-expression-per-line': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-indent': 0,
    'react/jsx-wrap-multilines': ['error', { declaration: false, assignment: false }],
    'react/jsx-filename-extension': 0,
    'react/state-in-constructor': 0,
    'react/jsx-props-no-spreading': 0,
    'react/destructuring-assignment': 0, // TODO: remove later
    'react/require-default-props': 0,
    'react/sort-comp': 0,
    'react/display-name': 0,
    'react/static-property-placement': 0,
    'react/no-danger': 0,
    'react/no-find-dom-node': 0,
    'react/no-unused-prop-types': 0,
    'react/default-props-match-prop-types': 0,
    'react-hooks/rules-of-hooks': 2, // Checks rules of Hooks

    'import/extensions': 0,
    'import/no-cycle': 0,
    "import/no-unresolved": "off",
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'site/**',
          'tests/**',
          'scripts/**',
          '**/*.test.js',
          '**/__tests__/*',
          '*.config.js',
          '**/*.md',
        ]
      },
    ],
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-has-content': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    // label-has-for has been deprecated
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/label-has-associated-control': 0,

    'consistent-return': 0, // TODO: remove later
    'no-param-reassign': 0, // TODO: remove later
    'no-underscore-dangle': 0,
    // for (let i = 0; i < len; i++)
    'no-plusplus': 0,
    // https://eslint.org/docs/rules/no-continue
    // labeledLoop is conflicted with `eslint . --fix`
    'no-continue': 0,
    // ban this for Number.isNaN needs polyfill
    'no-restricted-globals': 0,
    'max-classes-per-file': 0,

    'jest/no-test-callback': 0,
    'jest/expect-expect': 0,

    'unicorn/better-regex': 2,
    'unicorn/prefer-trim-start-end': 2,
    'unicorn/expiring-todo-comments': 2,
    'unicorn/no-abusive-eslint-disable': 2,

    "no-console": isLintEnv ? 2 : 1,
    "func-names": isLintEnv ? 2 : 1,
  },
  globals: {
    gtag: true,
  },
};