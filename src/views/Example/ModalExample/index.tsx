import React from "react";
import styled from "styled-components";

import Layout from "../../../components/Layout/Layout";
import Modal from "../../../components/Modal/Modal";
import Button from "../../../components/Button/Button";

const ModalExample: React.FC = () => {
  return (
    <Layout type="example">
      <Styled>
        <h1>
          <span>ModalExample</span>
        </h1>

        <Modal
          className="mt-30"
          title="タイトル01"
          text="モーダルテキスト01"
          button={{
            text: "イベント01",
            onClick: () => alert("01 onClicked !!"),
          }}
          initOpen={false}
        >
          <Button>モーダルを開く01</Button>
        </Modal>

        <Modal
          className="mt-30"
          title="タイトル02"
          text="モーダルテキスト02"
          button={{
            text: "イベント02",
            onClick: () => alert("02 onClicked !!"),
          }}
          initOpen={false}
        >
          <Button className="secondary">モーダルを開く02</Button>
        </Modal>

        <Modal
          className="mt-30"
          title="タイトル03"
          text="モーダルテキスト03"
          button={{
            text: "イベント03",
            onClick: () => alert("03 onClicked !!"),
          }}
          initOpen={false}
        >
          <Button disabled>モーダルを開く03</Button>
        </Modal>

        <Modal
          className="mt-30"
          title="タイトル04"
          text="モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04"
          button={{
            text: "イベント04",
            onClick: () => alert("04 onClicked !!"),
          }}
          initOpen={false}
        >
          モーダルを開く04
        </Modal>
      </Styled>
    </Layout>
  );
};

const Styled = styled.div`
  .mt-30 {
    margin-top: 30px;
    display: block;
  }
`;

export default ModalExample;
