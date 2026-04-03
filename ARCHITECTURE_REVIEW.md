# Architecture Re-Review (react-cognito-vite)

更新日: 2026-04-03

## 概要

前回レビュー以降、ディレクトリ構成が `src/features/<domain>/<usecase>` ベースへ再編され、
「サンプル寄りの pages 中心構造」から「機能単位で把握しやすい構造」へ改善されています。

特に、`auth` と `example` のユースケース群が明確に分離されたことで、
画面追加時の配置規約は以前より揃いやすくなりました。

一方で、前回指摘した以下は依然として主要課題です。

- ルーティング定義とヘッダーメニュー定義の重複
- auth/api helper から store を直接 dispatch する結合
- API戻り値の `AxiosResponse<T> | TypeApiError` union による呼び出し側の曖昧さ
- `TypeHeader` / `TypeLayout` の `type: string` など、境界型の緩さ

---

## 改善が確認できた点

### 1) 機能単位の構成が進んだ

`src/features/auth/*` および `src/features/example/*` にページ・部品・補助ロジックがまとまり、
学習用構成から実運用寄りの「探索しやすい配置」に近づいています。

**評価**: ✅ 中長期での保守性にプラス

### 2) Router 側の import が feature 起点で読みやすい

`src/router/index.tsx` から feature page を直接参照する形になっており、
「どの機能が画面公開されているか」の見通しは良好です。

**評価**: ✅ 依存の可視性が高い

---

## 継続課題（優先度順）

### P1. ルート定義とナビ定義の単一化（最優先）

現状、`src/router/index.tsx` と `src/components/layouts/header.tsx` の双方で
パス文字列を個別管理しています。

**リスク**

- 画面追加・変更時に修正漏れが発生しやすい
- PC ナビと SP ドロップダウンでさらに重複する

**推奨対応**

- `src/router/routes.ts` を新設し、以下を一元定義
  - `path`
  - `label`
  - `layoutType` (`"auth" | "example"`)
  - `authGuard` (`public` / `protected` / `anonymousOnly`)
  - `showInNav` / `showInMobileMenu`
- Router 生成と Header メニュー生成を同一定義から行う

---

### P2. ローディング制御の責務分離（auth/api helper 直接 dispatch の解消）

`utils/authHelper` と `utils/apiHelper` が `store.dispatch(loadingFlagUp/Down)` を直接実行しており、
ドメイン処理と UI 表示制御が結合しています。

**リスク**

- helper の再利用性・テスト容易性が低い
- 将来 thunk/RTK Query へ移行時に差し替えコストが高い

**推奨対応**

- 最小案: `withLoading(asyncFn)` を導入し、`try/finally` を共通化
- 発展案: 認証/API を RTK async thunk または RTK Query に寄せる

---

### P3. API 戻り値型の標準化（Result 型）

現状 `AxiosResponse<T> | TypeApiError` のため、呼び出し側に型ガード責務が散らばります。

**推奨対応**

- `Result<T, E>` へ統一
  - `ok: true` のときのみ `data` 参照可
  - `ok: false` のとき `error` 必須
- 併せてページ側で成功/失敗ハンドリングの定型を統一

---

### P4. 境界型の厳密化（literal union / RHF 型の直接利用）

`TypeHeader` / `TypeLayout` が `type: string`、`errors?: object` など緩い型が残っています。

**推奨対応**

- `type: "auth" | "example"` へ変更
- react-hook-form は `FieldErrors<T>` を利用
- `Array<object & { id: string }>` などの曖昧型を具体化

---

## 推奨ロードマップ（短期2スプリント想定）

1. **routes.ts 新設 + Router/Header の共通化**
2. **layout type を literal union 化 (`auth` / `example`)**
3. **withLoading 導入で手動 Up/Down を縮小**
4. **API を Result 型へ寄せる**
5. （中期）**utils 直下の責務を features 配下へ再配置**

---

## 総合評価（再レビュー）

- **前回比**: 改善（特に feature 構成の導入が良い）
- **現状の強み**: 学習コストと可読性のバランスが良い
- **現状のボトルネック**: 文字列重複管理と helper の責務混在
- **結論**: 全面リライトは不要。まずは「ルート定義単一化 + 型厳密化 + ローディング責務分離」の3点を先行すると、拡張時の事故率を大きく下げられます。
