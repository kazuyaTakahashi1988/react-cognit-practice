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
  plugins: ["@typescript-eslint", "react", "react-hooks", "import", "sonarjs"],
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
  rules: {
    "react/react-in-jsx-scope": "off",
    "no-use-before-define": "off",
    "no-console": "error",
    "no-undef": "off",
    "import/default": "off",
    "import/no-named-as-default": "off",
    quotes: ["error", "double"],

    // import順
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

    // 認知的複雑度（Cognitive Complexity）
    "sonarjs/cognitive-complexity": ["error", 5],
    complexity: ["error", { max: 5 }], // 関数内の分岐複雑度
    "max-depth": ["error", 15], // ネストの深さ制限
    "no-else-return": ["error"], // 不要な else の排除
    "sonarjs/no-small-switch": ["error"], // 無意味に小さい switch の警告
    // 認知的複雑度（デフォルトの上限はなし）
  },
};
