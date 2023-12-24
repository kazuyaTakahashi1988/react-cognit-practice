import React from "react";
import styled from "styled-components";

import Layout from "../../../components/Layout/Layout";
import Accordion from "../../../components/Accordion/Accordion";

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
`;

export default AccordionExample;
