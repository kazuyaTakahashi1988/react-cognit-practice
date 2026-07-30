※CSSは [ styled-components ] を使っているので<br>
vscode にプラグイン [ vscode-styled-components ] [ styled-components-snippets ] を<br>
それぞれインストールすると便利<br><br>
※ 他、vscode用推奨プラグイン一覧 → <a href="https://github.com/kazuyaTakahashi1988/react-cognit-practice/blob/main/.vscode/extensions.json" target="_blank">.vscode/extensions.json</a>

<br>

# ① 初回セットアップ ( node v24.x )

<sub># git clone でこのアプリのソースをダウンロードするコマンド</sub>

```bash
git clone https://github.com/kazuyaTakahashi1988/react-cognit-practice.git
```

<sub># このアプリのソースがある階層に移動するコマンド</sub>

```bash
cd react-cognit-practice
```

<sub># node バージョンを確認するコマンド</sub>

```bash
# v24.x であることを確認する
node -v
```

<sub># node モジュールをDLするコマンド</sub>

```bash
yarn install
```

<sub># 環境変数ファイル（dev用）をコピーするコマンド</sub>

```bash
cp .env.development .env
```

<sub># アプリを起動するコマンド</sub>

```bash
yarn dev
```

↓↓↓↓<br>

Open <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> in your browser<br>
<br>

# ② storybook を利用する場合

<sub># node モジュールをDLするコマンド</sub>

```bash
# 上述 ① の手順を終えてるなら必要なし
yarn install
```

<sub># storybook を起動するコマンド</sub>

```bash
yarn storybook
```

↓↓↓↓<br>

Open <a href="http://localhost:6006" target="_blank">http://localhost:6006</a> in your browser<br>
<br>

# ③ CDK で aws cognito を環境構築する場合

以下、要必須<br>
・aws CLI のインストール<br>
・IAMクレデンシャルの設定<br>
・node ver 20.x<br>

<sub># cdk ディレクトリに移動するコマンド</sub>

```bash
cd cdk
```

<sub># node バージョンを確認するコマンド</sub>

```bash
# v20.x であることを確認する
node -v
```

<sub># CDK用の node モジュールをDLするコマンド</sub>

```bash
npm i
```

<sub># CDK で aws cognito を環境構築するコマンド</sub>

```bash
npx cdk synth
npx cdk bootstrap
npx cdk deploy
```

↓↓↓↓

<sub># ルートに戻り .env ファイルを編集する（cognito環境変数を設定する）</sub>

```bash
VITE_APP_AWS_COGNITO_REGION='ap-northeast-1'
VITE_APP_AWS_COGNITO_IDENTITY_POOL_ID='xxxxxxxxx' # ここは設定の必要なし
VITE_APP_AWS_COGNITO_USER_POOL_ID='ap-northeast-1_xxxxxxxxx' # ユーザープールIDを設定する
VITE_APP_AWS_COGNITO_CLIENT_ID='xxxxxxxxx' # クライアントIDを設定する
```

<br>

## Analysis with SonarQube

Link to <a href="https://sonarcloud.io/project/overview?id=kazuyaTakahashi1988_react-cognit-practice" target="_blank">SonarQube</a><br>
<br>

## Architecture Review by Codex

Link to <a href="https://github.com/kazuyaTakahashi1988/react-cognit-practice/blob/main/ARCHITECTURE_REVIEW.md" target="_blank">ARCHITECTURE_REVIEW.md</a><br>
<br>
※ プロンプトは以下

```
コードベースで全体を評価してください。
アーキテクチャ的に良い点と悪い点（改善できる余地）があれば詳しく解説お願いいたします。
特に小規模・中規模・大規模プロジェクト、どのレベルまで実用的なのかも解説をお願いいたします。
```

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
├── scripts          # 各scripts（yarnコマンド用途）
├── src/             # アプリ本体
│   ├── components       # 各コンポーネント
│   ├── features         # 各画面（コロケーション）
│   ├── lib              # 静的な値・処理
│   ├── router           # ナビゲーション
│   ├── utils            # 動的な処理
│   ├── App.tsx          # アプリルートファイル
│   └── main.tsx         # アプリメインファイル
├── stories          # ストーリーブック
├── ...
├── ...
└── README.md        # This file
```

### 中規模開発での配置ルール

元の `components / features / lib / router / utils` という分け方を保ちつつ、次の基準でファイルを配置します。

- `features/**/page.tsx`: URL に対応する入口です。レイアウト、データ取得結果、画面遷移を組み立てます。
- `features/**/component.tsx`: その画面固有の表示だけを担当します。別 feature からは import しません。
- `features/**/hooks.ts`: 複数コンポーネントで共有する画面固有の状態や副作用が生じた場合に追加します。単純な処理のために無理に作りません。
- `features/**/type.ts`: フォーム値など、その feature でしか使わない型を置きます。複数 feature で共有する型だけを共通層へ移します。
- `utils/apiHelper/client.ts`: HTTP の共通処理、`modules/*.ts`: API の業務領域ごとの関数を置きます。正常時は `ok: true`、API エラー時は `ok: false` で判定します。
- `router/routeConfig.tsx`: URL と page、`guards.tsx`: 認証制御、`index.tsx`: ルートの組み立てだけを担当します。
- `utils/storeHelper/slices`: 機能単位の Redux slice を置き、`storeHelper/index.ts` で結合します。

認証トークンは独自に Web Storage へ保存せず、Amplify が管理するセッションを `fetchAuthSession` から取得します。これにより Cognito の更新処理も Amplify に任せられます。
