import React from 'react';
import styled from 'styled-components'

import DropdownMenu from '../../components/DropdownMenu/DropdownMenu';

const DropdownMenuExample: React.FC = () => {

  return (
    <Styled>
      <h1><span>DropdownMenuExample</span></h1>

      <div className='clm'>
        <DropdownMenu
          menuList={[
            {text: 'Menu_A_01Menu_A_01Menu_A_01Menu_A_01Menu_A_01Menu_A_01Menu_A_01Menu_A_01', onClick: () => alert('01 onClicked !!')},
            {text: 'Menu_A_02', onClick: () => alert('02 onClicked !!')},
            {text: 'Menu_A_03', onClick: () => alert('03 onClicked !!')}
          ]}
        >
          ドロップダウンメニュー_A
        </DropdownMenu>
      </div>

      <div className='clm right'>
        <DropdownMenu
          menuList={[
            {text: 'Menu_B_01', onClick: () => alert('01 onClicked !!')},
            {text: 'Menu_B_02', onClick: () => alert('02 onClicked !!')},
            {text: 'Menu_B_03', onClick: () => alert('03 onClicked !!')}
          ]}
        >
          ドロップダウンメニュー_B
        </DropdownMenu>
      </div>

      <div className='clm'>
        <DropdownMenu
          menuList={[
            {text: 'Menu_C_01', onClick: () => alert('01 onClicked !!')},
            {text: 'Menu_C_02', onClick: () => alert('02 onClicked !!')},
            {text: 'Menu_C_03', onClick: () => alert('03 onClicked !!')}
          ]}
        >
          ドロップダウンメニュー_c
        </DropdownMenu>
      </div>

      <div className='clm right'>
        <DropdownMenu
          menuList={[
            {text: 'Menu_D_01', onClick: () => alert('01 onClicked !!')},
            {text: 'Menu_D_02', onClick: () => alert('02 onClicked !!')},
            {text: 'Menu_D_03', onClick: () => alert('03 onClicked !!')}
          ]}
        >
          ドロップダウンメニュー_D
        </DropdownMenu>
      </div>
    </Styled>
  );
};

const Styled = styled.div`
  padding: 30px;
  max-width: 480px;
  margin: 0 auto;
  background: #f5f5f5;
  .clm{
    margin: 30px 0 300px 0;
    &:last-of-type {
      margin-bottom: 0;
    }
    &.right {
      text-align: right;
    }
  }
`;

export default DropdownMenuExample;
