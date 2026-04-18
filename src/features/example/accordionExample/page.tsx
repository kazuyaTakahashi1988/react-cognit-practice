import styled from "styled-components";

import Accordion from "../../../components/accordion/accordion";
import Layout from "../../../components/layouts/layout";
import { color, media } from "../../../lib/style";

import type React from "react";

/* -----------------------------------------------
 * AccordionExample ページ
 * ----------------------------------------------- */

export const pageMeta = {
  title: "Accordion Example",
  description: "アコーディオンコンポーネントの利用例を確認できるサンプルページです。",
  sharePath: "/example/accordion_example",
};

const AccordionExample: React.FC = () => {
  return (
    <Layout
      pageMeta={pageMeta}
      type="example"
    >
      <Styled>
        <h1>
          <span>AccordionExample</span>
        </h1>

        {/* アコーディオン */}
        <Accordion className="mt-30" title="アコーディオンタイトル">
          <h3>アコーディオンコンテンツ</h3>
          <p>
            ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・
          </p>
        </Accordion>

        {/* アコーディオン（デフォルトオープン） */}
        <Accordion
          className="mt-30"
          title="アコーディオンタイトル（デフォルトオープン）"
          visible={true}
        >
          <h3>
            アコーディオンコンテンツ
            <br />
            （デフォルトオープン）
          </h3>
          <p>
            ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・
          </p>
        </Accordion>
      </Styled>
    </Layout>
  );
};

const Styled = styled.div`
  .mt-30 {
    margin-top: 30px;
  }

  /* ---------------------------------------------- 
    "lib/style/_variable" 試し書き
  ---------------------------------------------- */
  color: ${color.black};

  // @media (min-width: 769px){ ・・・ } の内容が記述できるよ
  ${media.pc} {
  }

  // @media (max-width: 1080px){ ・・・ } の内容が記述できるよ
  ${media.tab} {
  }

  // @media (max-width: 768px){ ・・・ } の内容が記述できるよ
  ${media.sp} {
  }
`;

export default AccordionExample;
