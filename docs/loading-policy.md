# Loading の運用方針

Loading は、待機対象となる範囲に合わせて表示方法を選びます。API クライアントは通信だけを担当し、Loading の表示方法は呼び出し側が決定します。

## Global Loading

`withGlobalLoading` は、処理中に画面全体の操作を止める必要がある場合だけ使用します。

- サインイン、サインアウトなど、完了前の別操作を避けたい処理
- 決済など、二重実行の影響が大きい処理
- 画面全体の前提となる状態を切り替える処理

原則として、ページコンポーネントから直接呼び出さず、`useSignIn` のようなユースケースを表す hook 内で使用します。

```ts
const save = (data: SaveValues) => withGlobalLoading(() => saveHelper(data));
```

## Page / Local Loading

次の処理では Global Loading を使用せず、対象範囲に loading 状態を表示します。

- ページの初回データ取得: ページ内に skeleton または Loading を表示する
- 一覧の再取得やページ送り: 一覧部分に Loading を表示する
- フォーム送信: 必要に応じて送信ボタンを無効化し、ボタン内に Loading を表示する
- ファイル送信: 対象領域に進捗を表示する

## Background Loading

キャッシュの再検証、定期更新、先読みなど、利用者の操作を止める必要がない通信では Loading を表示しません。失敗を利用者へ通知する必要がある場合は、処理の重要度に応じてインラインメッセージや通知を使用します。

## 実装上のルール

1. API クライアントへ UI の Loading 制御を追加しない。
2. `loadingFlagUp` / `loadingFlagDown` をページから直接 dispatch しない。
3. Global Loading が必要な処理は `withGlobalLoading` で開始・終了を必ず対にする。
4. 同じ処理を複数の層で `withGlobalLoading` に包まない。
5. 渡す Promise は、成功・失敗・キャンセルのいずれでも必ず settle するようにする。
