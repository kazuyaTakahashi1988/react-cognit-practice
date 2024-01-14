module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'plugin:storybook/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    /* ------------------------------------------------
      ▽▽▽ プロジェクトごとにLintルールを追加しよう ▽▽▽
    ------------------------------------------------ */
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off',
    'no-use-before-define': 0,
    // 'no-console': 'error',
    // 'no-restricted-syntax': [
    //   'error',
    //   {
    //     'selector': 'CallExpression[callee.object.name="console"][callee.property.name!=/^(log|warn|error|info|trace)$/]',
    //     'message': 'Unexpected property on console object was called'
    //   }
    // ]
  },
}
