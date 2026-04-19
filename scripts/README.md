yarn XXXX など、コマンドを叩いた際に呼び出される処理を纏める<br>
（例：yarn build:scripts など）
<br>

## Folder Detail

```
scripts/
├── build/             # yarn build:scripts コマンド用の処理
│   ├── pageMeta.mjs       # 各 page.tsx 内の pageMeta 情報を抽出・一覧する処理
│   ├── prerender.mjs      # プリレンダリング用 index.html を自動生成する処理
│   └── sitemap.mjs        # sitemap.xml を自動生成する処理
├── xxxx
├── xxxx
├── xxxx
└── README.md        # This file
```
