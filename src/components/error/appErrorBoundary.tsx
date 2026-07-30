import { Component } from "react";

import type React from "react";

/* -----------------------------------------------
 * 描画中の予期しないエラーをアプリ全体で受け止める
 * ----------------------------------------------- */

type AppErrorBoundaryState = { hasError: boolean };

export class AppErrorBoundary extends Component<
  React.PropsWithChildren,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // 監視サービス導入時は、この箇所からエラーを送信する
    console.error("Unexpected application error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main role="alert">
          <h1>エラーが発生しました</h1>
          <p>ページを再読み込みして、もう一度お試しください。</p>
        </main>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
