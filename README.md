※CSSは [ styled-components ] を使っているので<br>
vs-code にプラグイン [ vscode-styled-components ] [ styled-components-snippets ] を<br>
それぞれインストールすると便利
<br>

# ① node v18.x 下で npm i & npm run start

```
$ node -v
v18.x

$ npm i
$ npm run start
```

↓↓↓↓<br>

Open <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> in your browser<br>
<br>

# ② storybook を利用する場合

```
$ npm i // ←上述①の手順を終えてるなら必要なし
$ npm run storybook
```

↓↓↓↓<br>

Open <a href="http://localhost:6006" target="_blank">http://localhost:6006</a> in your browser<br>
<br>

# ③ cdk コマンドで aws cognitoを環境構築する場合

以下のローカル環境設定を事前に準備する<br>
・aws CLI のインストール<br>
・IAMクレデンシャルの設定<br>
・node ver 18.x<br>

```
$ cd cdk // ← cdk ディレクトリに移動する

$ npm i
$ npx cdk synth
$ npx cdk bootstrap // ← 必要なら
$ npx cdk deploy

```

↓↓↓↓

.env.local ファイルを編集する（cognito環境変数を設定する）

※ exsample

```
REACT_APP_AWS_COGNITO_REGION='************'
REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID='************'
REACT_APP_AWS_COGNITO_USER_POOL_ID='************'
REACT_APP_AWS_COGNITO_CLIENT_ID='************'
```

↓↓↓↓

```
REACT_APP_AWS_COGNITO_REGION='ap-northeast-1'
REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID='************'
REACT_APP_AWS_COGNITO_USER_POOL_ID='ap-northeast-1_rKjlyQsbS'
REACT_APP_AWS_COGNITO_CLIENT_ID='40oec5o56lukbe6ch1s9al1qh'
```

↓↓↓↓

ルートに戻ってnpm i & npm run start (Node ver 18.x)

```
$ npm i // ←上述①の手順を終えてるなら必要なし
$ npm run start
```

↓↓↓↓<br>

Open <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> in your browser<br>
<br>
