# AWS CDK で aws cognito を環境構築する場合

以下、要必須<br>
・aws CLI のインストール<br>
・IAMクレデンシャルの設定<br>
・node ver 20.x<br>

<sub># git switch で、このアプリの AWS CDK 用ブランチに切り替える</sub>

```bash
git switch for-aws-cdk
```

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