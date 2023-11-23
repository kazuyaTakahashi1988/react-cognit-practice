import React from 'react';
import styled from 'styled-components'

import Layout from '../../../components/Layout/Layout';
import Accordion from '../../../components/Accordion/Accordion';

const AccordionExample: React.FC = () => {

  return (
    <Layout type='example'>
      <Styled>
        <h1><span>AccordionExample</span></h1>

        <div className='clm'>
          <Accordion title="アコーディオンタイトル" initOpen={false}>
            <h3>アコーディオンコンテンツ</h3>
            <p>ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・</p>
          </Accordion>
        </div>

        <div className='clm'>
          <Accordion title="アコーディオンタイトル（デフォルトオープン）" initOpen={true}>
            <h3>アコーディオンコンテンツ<br />（デフォルトオープン）</h3>
            <p>ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・</p>
          </Accordion>
        </div>
      </Styled>
    </Layout>
  );
};

const Styled = styled.div`
  .clm{
    margin-top: 30px;
  }
`;

export default AccordionExample;
