import React from "react";
import styled from "styled-components";
import { media, params } from "../../../lib/style";

import Layout from "../../../components/layout/layout";
import Accordion from "../../../components/accordion/accordion";

const AccordionExample: React.FC = () => {
  return (
    <Layout type="example">
      <Styled>
        <h1>
          <span>AccordionExample</span>
        </h1>

        <Accordion className="mt-30" title="アコーディオンタイトル">
          <h3>アコーディオンコンテンツ</h3>
          <p>
            ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・
          </p>
        </Accordion>

        <Accordion
          className="mt-30"
          title="アコーディオンタイトル（デフォルトオープン）"
          initOpen={true}
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
    lib/Style/_mixin 試し書き
  ---------------------------------------------- */
  color: ${params.black};
  ${media.pc} {
    /* @media (min-width: 769px){} の内容が記述できるよ */
  }
  ${media.sp} {
    /* @media (max-width: 768px){} の内容が記述できるよ */
  }
  ${media.tab} {
    /* @media (max-width: 1080px){} の内容が記述できるよ */
  }
`;

export default AccordionExample;
