import { Component } from "react";

import type React from "react";

type ErrorBoundaryProps = React.PropsWithChildren;
type ErrorBoundaryState = { hasError: boolean };

/** 描画中の予期しない例外をアプリ全体のフォールバックへ変換する。 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: React.ErrorInfo) {
    // 将来の監視サービス導入時に、この境界だけを差し替えればよい。
    console.error("Unhandled rendering error", error, info);
  }

  public render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main aria-labelledby="unexpected-error-title" role="alert">
        <h1 id="unexpected-error-title">問題が発生しました</h1>
        <p>画面を正常に表示できませんでした。再読み込みをお試しください。</p>
        <button onClick={() => window.location.reload()} type="button">
          再読み込み
        </button>
      </main>
    );
  }
}
