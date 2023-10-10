事前に必要なローカル設定は以下

・AWS CLI のインストール

・IAMクレデンシャルの設定

・Node ver 18.x

# AWS CDKでcognito環境を用意する
```
$ cd cdk
$ npm i
$ npx cdk synth
$ npx cdk deploy
```

# .env.local ファイルを編集する（cognito環境変数を設定する）
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
REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID='ap-northeast-1:2bbd9465-f94d-45b9-92bf-f4dc1fa89dc6'
REACT_APP_AWS_COGNITO_USER_POOL_ID='ap-northeast-1_rKjlyQsbS'
REACT_APP_AWS_COGNITO_CLIENT_ID='40oec5o56lukbe6ch1s9al1qh'
```

　　　　　↓↓↓↓
# ルートに戻ってnpm i & npm run start (Node ver 18.x)
```
$ npm i
$ npm run start
```

　　　　　↓↓↓↓
# Open <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> in your browser
