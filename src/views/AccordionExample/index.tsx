import React from 'react';
import styled from 'styled-components'

import Accordion from '../../components/Accordion/Accordion';

const AccordionExample: React.FC = () => {

  return (
    <Styled>
      <h1><span>AccordionExample</span></h1>

      <div className='clm'>
        <Accordion title="アコーディオンタイトル" initOpen={false}>
          <h3>アコーディオンコンテンツ</h3>
          <p>ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・</p>
        </Accordion>
      </div>

      <div className='clm'>
        <Accordion title="アコーディオンタイトル（デフォルオープン）" initOpen={true}>
          <h3>アコーディオンコンテンツ<br />（デフォルオープン）</h3>
          <p>ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・</p>
        </Accordion>
      </div>
    </Styled>
  );
};

const Styled = styled.div`
  padding: 30px;
  max-width: 480px;
  margin: 0 auto;
  .clm{
    margin-top: 30px;
  }
`;

export default AccordionExample;
