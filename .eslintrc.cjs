module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  // parserOptions: {
  //   ecmaVersion: 'latest',
  //   sourceType: 'module',
  //   project: ['./tsconfig. json'],
  //   tsconfigRootDir: __dirname
  // },
  ignorePatterns: ["dist", "node_modules"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended", "plugin:storybook/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "import"],
  rules: {
    /* ------------------------------------------------
      ▽▽▽ プロジェクトごとにLintルールを追加しよう ▽▽▽
    ------------------------------------------------ */
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-undef": "off",
    "react/react-in-jsx-scope": "off",
    "no-use-before-define": 0,
    // 'no-console': 'error',
    // 'no-restricted-syntax': [
    //   'error',
    //   {
    //     'selector': 'CallExpression[callee.object.name="console"][callee.property.name!=/^(log|warn|error|info|trace)$/]',
    //     'message': 'Unexpected property on console object was called'
    //   }
    // ]
    quotes: ["error", "double"],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "object",
          "type",
          "index",
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc"
        }
      }
    ]
  },
}
