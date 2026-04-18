※CSSは [ styled-components ] を使っているので<br>
vs-code にプラグイン [ vscode-styled-components ] [ styled-components-snippets ] を<br>
それぞれインストールすると便利
<br>

# ① node v24.x 下で yarn install & yarn dev

```
$ node -v
v24.x

$ yarn install
$ yarn dev
```

↓↓↓↓<br>

Open <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> in your browser<br>
<br>

# ② storybook を利用する場合

```
$ yarn install // ←上述①の手順を終えてるなら必要なし
$ yarn storybook
```

↓↓↓↓<br>

Open <a href="http://localhost:6006" target="_blank">http://localhost:6006</a> in your browser<br>
<br>

# ③ cdk コマンドで aws cognitoを環境構築する場合

以下のローカル環境設定を事前に準備する<br>
・aws CLI のインストール<br>
・IAMクレデンシャルの設定<br>
・node ver 20.x<br>

```
$ cd cdk // ← cdk ディレクトリに移動する

$ npm i
$ npx cdk synth
$ npx cdk bootstrap // ← 必要なら
$ npx cdk deploy

```

↓↓↓↓

.env.development ファイルを編集する（cognito環境変数を設定する）

※ exsample

```
VITE_APP_AWS_COGNITO_REGION='ap-northeast-1'
VITE_APP_AWS_COGNITO_IDENTITY_POOL_ID='xxxxxxxxx'
VITE_APP_AWS_COGNITO_USER_POOL_ID='ap-northeast-1_xxxxxxxxx'
VITE_APP_AWS_COGNITO_CLIENT_ID='xxxxxxxxx'
```

↓↓↓↓

```
VITE_APP_AWS_COGNITO_REGION='ap-northeast-1'
VITE_APP_AWS_COGNITO_IDENTITY_POOL_ID='************'
VITE_APP_AWS_COGNITO_USER_POOL_ID='ap-northeast-1_rKjlyQsbS'
VITE_APP_AWS_COGNITO_CLIENT_ID='40oec5o56lukbe6ch1s9al1qh'
```

↓↓↓↓

ルートに戻ってyarn install & yarn dev (node ver 24.x)

```
$ yarn install // ←上述①の手順を終えてるなら必要なし
$ yarn dev
```

↓↓↓↓<br>

Open <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> in your browser<br>
<br>


# ④ 主要ページの静的プリレンダ（SEO/SNS向け）

```
$ yarn build:prerender
```

- `dist/` の通常ビルド成果物に加え、以下ルートの `index.html` を静的出力します。
  - `/example/form_example`
  - `/example/todo_example`
  - `/example/modal_example`
  - `/example/accordion_example`
  - `/example/dropdownmenu_example`
  - `/auth/signin`
  - `/auth/signup`
  - `/auth/verification`
- 各ページに `title` / `description` / OGP / Twitter Card / canonical を埋め込みます。
- 各 `page.tsx` で `export const sharePath` と `export const pageMeta` を定義し、プリレンダでも同じ値を参照します。

## Analysis with SonarQube

Link to <a href="https://sonarcloud.io/project/overview?id=kazuyaTakahashi1988_react-cognit-practice" target="_blank">SonarQube</a><br>
<br>

## Project Structure

```
react-cognit-practice/
├── .github
├── .husky
├── .storybook
├── .vscode
├── cdk
├── public
├── src/             # アプリ本体
│   ├── components       # 各コンポーネント
│   ├── features         # 各画面（コロケーション）
│   ├── lib              # 静的な値・処理
│   ├── router           # ナビゲーション
│   ├── stories          # ストーリーブック
│   ├── utils            # 動的な処理
│   ├── App.tsx          # アプリルートファイル
│   └── main.tsx         # アプリメインファイル
├── ...
├── ...
├── ...
└── README.md        # This file
```
