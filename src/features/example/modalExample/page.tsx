import { useState } from "react";
import styled from "styled-components";

import Button from "../../../components/button/button";
import Layout from "../../../components/layouts/layout";
import Modal from "../../../components/modal/modal";
import { media, params } from "../../../lib/style";

import type React from "react";

/* -----------------------------------------------
 * "[root]/example/modal_example" ページ
 * ----------------------------------------------- */

const ModalExample: React.FC = () => {
  const [isVisible, setIsVisible] = useState({ modal01: false, modal02: false });

  const onModal = (target: string, flag: boolean) => {
    setIsVisible({ ...isVisible, [target]: flag });
  };

  return (
    <Layout type="example">
      <Styled>
        <h1>
          <span>ModalExample</span>
        </h1>

        <div className="button-clm">
          <Button onClick={() => onModal("modal01", true)}>モーダルを開く01</Button>

          <Button onClick={() => onModal("modal02", true)}>モーダルを開く02</Button>
        </div>

        <Modal
          onClose={{ text: "閉じる", onClick: () => onModal("modal01", false) }}
          onEvent={{ text: "イベント01", onClick: () => alert("01 onEvent !!") }}
          title="タイトル01"
          visible={isVisible.modal01}
        >
          ダミーテキスト・ダミーテキスト・ダミーテキスト
        </Modal>

        <Modal
          onClose={{ text: "閉じる", onClick: () => onModal("modal02", false) }}
          onEvent={{ text: "イベント02", onClick: () => alert("02 onEvent !!") }}
          title="タイトル02"
          visible={isVisible.modal02}
        >
          ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト
        </Modal>
      </Styled>
    </Layout>
  );
};

const Styled = styled.div`
  .button-clm {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    ${media.sp} {
      display: block;
    }
    > * {
      margin: 0 20px;
      ${media.sp} {
        display: block;
        margin: 0 auto 30px;
      }
    }
  }

  /* ---------------------------------------------- 
    "lib/style/_variable" 試し書き
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

export default ModalExample;
