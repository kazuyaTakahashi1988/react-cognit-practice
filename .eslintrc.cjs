module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["dist", "node_modules"],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true, // optional
        project: "./tsconfig.json", // tsconfigのパスを正しく
      },
    },
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "total-functions", "import", "sonarjs"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react-hooks/recommended",
    "plugin:sonarjs/recommended",
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  overrides: [
    {
      files: ["src/**/*.{ts,tsx}"], // eclintルールが適用される対象ファイル群
      rules: {
        /* buttonタグにtype指定することを強制 */
        "react/button-has-type": "error",
        /* TypeScriptで型定義している場合は、PropTypesで重ねて型検証する意味がないので"off" */
        "react/prop-types": "off",
        /* console.warn, error, info以外に警告。開発中のLog消し忘れ対策 */
        "no-console": ["warn", { allow: ["warn", "error", "info"] }],
        /* 特定のモジュールやパスからのインポートを禁止するためのルール */
        "no-restricted-imports": ["error", { patterns: ["@/????/**"] }],
        /* 未定義の変数を使うことを禁止するルールを"off" */
        "no-undef": "off",
        /* async 関数なのに await を使ってない場合の警告は"off"、"error"とする */
        "require-await": "off",
        "@typescript-eslint/require-await": "error",
        /* require() を使うことを禁止するルール */
        "@typescript-eslint/no-var-requires": 0,
        /* "!" を使った 非nullアサーション を禁止 */
        "@typescript-eslint/no-non-null-assertion": "error",
        /* 配列や文字列に対して "indexOf(...) !== -1" よりも "includes(...)" を使うことを推奨するルール */
        "@typescript-eslint/prefer-includes": "error",
        /* 型が"any"や"unknown"の値に対して、プロパティアクセスやメソッド呼び出しを行うと警告 */
        "@typescript-eslint/no-unsafe-member-access": "warn",
        /* 型(type)だけをimportする場合は "import type ~~~" を使うことを強制 */
        "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],

        /* -------------------------------------------------------
          import並び順、自動補正
        ---------------------------------------------------------- */
        "import/order": [
          "error",
          {
            groups: [
              "builtin",
              "external",
              "internal",
              ["parent", "sibling", "index"],
              "object",
              "type",
            ],
            "newlines-between": "always",
            alphabetize: {
              order: "asc",
              caseInsensitive: true,
            },
            pathGroupsExcludedImportTypes: ["builtin"],
          },
        ],
        "import/default": "off",
        "import/no-named-as-default": "off",

        /* -------------------------------------------------------
          認知的複雑度（sonarjs / total-functions / ESLintコア）
        ---------------------------------------------------------- */
        "sonarjs/cognitive-complexity": ["error", 15],
        "sonarjs/no-small-switch": ["error"], // 無意味に小さい switch の警告
        "total-functions/no-unsafe-type-assertion": "error", // 危険なasアサーションを禁止
        complexity: ["error", { max: 15 }], // 関数内の分岐複雑度
        "max-depth": ["error", 15], // ネストの深さ制限
        "no-else-return": ["error"], // 不要な else の排除

        /* -------------------------------------------------------
          自動フォーマッターの内容と合わせたeslintエラー設定群
          不要そうなら全部コメントアウトする
        --------------------------------------------------------- */
        /* すべての文字列は "ダブルクォート" を使うべきとする */
        quotes: ["error", "double"],
        /* 複数行（改行あり）の配列・オブジェクト・引数などの最後に カンマを必ず付けるルール */
        "comma-dangle": ["error", "always-multiline"],
        /* カンマの前にスペースは不要、カンマの後にはスペースを入れるルール */
        "comma-spacing": ["error", { before: false, after: true }],
        /* 空行を制限するルール（連続できる空行の最大数：2行、ファイルの先頭・末尾に許容される空行：0行 */
        "no-multiple-empty-lines": ["error", { max: 2, maxBOF: 0, maxEOF: 0 }],
        /* オブジェクトのキーとコロン : の間のスペースを必須にするルール */
        "key-spacing": ["error", { afterColon: true }],
        /* 中括弧 {} 内のスペースの有無を制御するルール */
        "object-curly-spacing": ["error", "always", { objectsInObjects: false }],

        /* -------------------------------------------------------
          なぜか上手く機能しない設定
        ---------------------------------------------------------- */
        /* 変数や関数を定義前に使うのを禁止するルールを"off" */
        // "no-use-before-define": "off",
      },
    },
  ],
};
