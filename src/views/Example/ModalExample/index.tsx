import React from 'react';
import styled from 'styled-components'

import Layout from '../../../components/Layout/Layout';
import Modal from '../../../components/Modal/Modal';
import Button from '../../../components/Button/Button';

const ModalExample: React.FC = () => {

  return (
    <Layout type="example">
      <Styled>
        <h1><span>ModalExample</span></h1>

        <div className="clm">
          <Modal
            title="タイトル01"
            text="モーダルテキスト01"
            button={{ text: 'イベント01', onClick: () => alert('01 onClicked !!') }}
          >
            <Button
              type={undefined}
              onClick={undefined}
              isDisable={false}
            >
              モーダルを開く01
            </Button>
          </Modal>
        </div>

        <div className="clm">
          <Modal
            title="タイトル02"
            text="モーダルテキスト02"
            button={{ text: 'イベント02', onClick: () => alert('02 onClicked !!') }}
          >
            <Button
              type="secondary"
              onClick={undefined}
              isDisable={false}
            >
              モーダルを開く02
            </Button>
          </Modal>
        </div>

        <div className="clm">
          <Modal
            title="タイトル03"
            text="モーダルテキスト03"
            button={{ text: 'イベント03', onClick: () => alert('03 onClicked !!') }}
          >
            <Button
              type={undefined}
              onClick={undefined}
              isDisable={true}
            >
              モーダルを開く03
            </Button>
          </Modal>
        </div>

        <div className="clm">
          <Modal
            title="タイトル04"
            text="モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04・モーダルテキスト04"
            button={{ text: 'イベント04', onClick: () => alert('04 onClicked !!') }}
          >
            モーダルを開く04
          </Modal>
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

export default ModalExample;
