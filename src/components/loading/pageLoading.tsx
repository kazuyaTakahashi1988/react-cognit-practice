import styled from "styled-components";

import { color } from "../../lib/style";

/* -----------------------------------------------
 * 画面の遅延読み込み中に表示するローディング
 * ----------------------------------------------- */

export const PageLoading = () => (
  <Styled aria-live="polite" role="status">
    読み込み中...
  </Styled>
);

const Styled = styled.div`
  align-items: center;
  color: ${color.black};
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

export default PageLoading;
