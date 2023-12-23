import React, { useState } from "react";
import styled from "styled-components";

import Layout from "../../../components/Layout/Layout";
import Modal from "../../../components/Modal/Modal";
import Button from "../../../components/Button/Button";

const ModalExample: React.FC = () => {
  const [isModal, setIsModal] = useState({
    modal01: false,
    modal02: false,
  });

  const onModal = (target: string, flag: boolean) => {
    setIsModal({ ...isModal, [target]: flag });
  };

  return (
    <Layout type="example">
      <Styled>
        <h1>
          <span>ModalExample</span>
        </h1>

        <div className="button-clm">
          <Button onClick={() => onModal("modal01", true)}>
            モーダルを開く01
          </Button>

          <Button onClick={() => onModal("modal02", true)}>
            モーダルを開く02
          </Button>
        </div>

        {isModal.modal01 && (
          <Modal
            title="タイトル01"
            onEvent={{
              text: "イベント01",
              onClick: () => alert("01 onEvent !!"),
            }}
            onClose={{
              text: "閉じる",
              onClick: () => onModal("modal01", false),
            }}
          >
            ダミーテキスト・ダミーテキスト・ダミーテキスト
          </Modal>
        )}

        {isModal.modal02 && (
          <Modal
            title="タイトル02"
            onEvent={{
              text: "イベント02",
              onClick: () => alert("02 onEvent !!"),
            }}
            onClose={{
              text: "閉じる",
              onClick: () => onModal("modal02", false),
            }}
          >
            ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト
          </Modal>
        )}
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
    > * {
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

export default ModalExample;
