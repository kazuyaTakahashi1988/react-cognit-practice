import { Component } from "react";

import type React from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  private readonly reset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main role="alert">
        <h1>予期しないエラーが発生しました</h1>
        <p>
          操作をやり直してください。解決しない場合はページを再読み込みしてください。
        </p>
        <button onClick={this.reset} type="button">
          もう一度試す
        </button>
      </main>
    );
  }
}

export default AppErrorBoundary;
