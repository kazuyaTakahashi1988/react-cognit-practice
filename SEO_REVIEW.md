# SEO / SNS シェア観点レビュー

対象: `react-cognit-practice`（Vite + React SPA）

## 結論（要約）

- **SNS シェア（OGP/Twitter Card）は「実装あり」**で、ページごとの `title`/`description`/`og:image` を動的に更新する仕組みがあります。
- ただし、**Google 検索向け SEO は現状だと強くない**です。主に SPA のため、クローラが初期 HTML だけを読む条件ではメタ情報が不足し、評価が下がる可能性があります。

## 良い点

1. `PageMeta` で以下を動的に設定している。  
   - `meta[name="description"]`  
   - `og:title`, `og:description`, `og:type`, `og:url`, `og:site_name`, `og:image`  
   - `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
2. 各ページ（例: SignIn / FormExample）で個別の `title`・`description`・`shareText` を渡している。
3. `robots.txt` は全体クロール許可（`Disallow:` 空）となっている。

## 懸念点（優先度順）

### 1) SPA のクライアント実行後にしかメタが入らない

- `PageMeta` は `useEffect` で `document.head` を更新するため、初回配信 HTML にはページ固有メタが含まれません。  
- Google は JS 実行できるケースも多いですが、**レンダリング遅延/取りこぼしのリスク**は SSR/SSG より高いです。

### 2) 初期 HTML の title が汎用 (`Vite + React + TS`)

- `index.html` の `<title>` がテンプレート初期値のままです。  
- JS 実行前の評価や共有クローラ条件によっては、このタイトルが使われる可能性があります。

### 3) canonical / sitemap の不足

- `rel="canonical"` が見当たりません（URL 正規化が弱い）。
- `public/sitemap.xml` が見当たりません（発見性に不利）。

### 4) OGP のベースURLが暫定的

- `BASE_URL` が `http://react-cognito.empty-service.com` で、`http` かつ実運用ドメインでない可能性があります。
- 本番URLと不一致の場合、SNS で誤URLの画像参照や評価分散が起こります。

## 「Google検索でうまく表示されるか？」の評価

- **現状評価: B-（最低限はあるが、強くはない）**
  - 理由: ページ固有メタは実装済みだが、SSR/SSG 非対応 SPA で、canonical/sitemap も不足。
- 検索流入を本気で狙うなら、次のいずれかが必要です。  
  1. SSR/SSG（Next.js / Remix / Astro / react-router のプリレンダ）へ移行  
  2. 主要ページの静的プリレンダ + 正しい canonical/sitemap + Search Console 運用

## 「SNSシェア時に文言・画像が出るか？」の評価

- **現状評価: B（多くの環境で表示される見込み）**
  - OGP/Twitter タグ自体は実装済み。
  - ただし、クローラが JS 実行しない/弱い場合や初期取得タイミングによって、期待通りに出ないリスクあり。
  - `BASE_URL` の本番不一致があると画像URLが壊れる可能性あり。

## 推奨アクション

### すぐできる（低コスト）

1. `index.html` の初期 `title` / `description` / OGP を実運用値に更新。  
2. `PageMeta` に `canonical` も upsert 追加。  
3. `BASE_URL` を環境変数化（`VITE_SITE_URL`）し、本番 HTTPS ドメインへ統一。  
4. `public/sitemap.xml` を追加し、Search Console に送信。

### 中期（効果が高い）

5. 主要公開ページを SSR/SSG/プリレンダ化。  
6. OG 画像のサイズ・比率（1200x630 推奨）を明示的に管理。  
7. 構造化データ（JSON-LD）をページ種別に導入。

## 参考: 手動確認手順

- Facebook Sharing Debugger でURL検証
- X Card Validator 相当ツールでカード検証
- `curl -sL https://<URL> | head` で初期HTMLの meta/title を確認
- Search Console の URL 検査で「インデックス登録済み/ページ取得」の状態を確認
