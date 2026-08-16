import { Component } from "react";
import styled from "styled-components";

import Button from "../components/button/button";

import type { ErrorInfo, ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

/* -----------------------------------------------
 * アプリ全体で捕捉されなかった描画エラーの最終境界
 * ----------------------------------------------- */
class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // 将来 Sentry 等を導入する場合は、この一箇所から通知する。
    console.error("Unhandled application error", error, info);
  }

  private readonly reload = () => window.location.reload();

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <Fallback role="alert">
        <h1>予期しないエラーが発生しました</h1>
        <p>ページを再読み込みして、もう一度お試しください。</p>
        <Button onClick={this.reload}>ページを再読み込み</Button>
      </Fallback>
    );
  }
}

const Fallback = styled.main`
  max-width: 640px;
  margin: 80px auto;
  padding: 0 20px;
  text-align: center;

  > p,
  > button {
    margin-top: 30px;
  }
`;

export default AppErrorBoundary;
