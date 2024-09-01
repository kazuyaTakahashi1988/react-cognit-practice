import React from "react";
import styled from "styled-components";
import { media, params } from "../../../lib/style";

import Layout from "../../../components/layout/layout";
import DropdownMenu from "../../../components/dropdownMenu/dropdownMenu";

const DropdownMenuExample: React.FC = () => {
  return (
    <Layout type="example">
      <Styled>
        <h1>
          <span>DropdownMenuExample</span>
        </h1>

        <DropdownMenu
          className="mt-30"
          menuList={[
            {
              text: "Menu_A_01Menu_A_01Menu_A_01Menu_A_01Menu_A_01Menu_A_01Menu_A_01Menu_A_01",
              onClick: () => alert("01 onClicked !!"),
            },
            { text: "Menu_A_02", onClick: () => alert("02 onClicked !!") },
            { text: "Menu_A_03", onClick: () => alert("03 onClicked !!") },
          ]}
        >
          ドロップダウンメニュー_A
        </DropdownMenu>

        <DropdownMenu
          className="mt-30 right"
          menuList={[
            { text: "Menu_B_01", onClick: () => alert("01 onClicked !!") },
            { text: "Menu_B_02", onClick: () => alert("02 onClicked !!") },
            { text: "Menu_B_03", onClick: () => alert("03 onClicked !!") },
          ]}
        >
          ドロップダウンメニュー_B
        </DropdownMenu>

        <DropdownMenu
          className="mt-30"
          menuList={[
            { text: "Menu_C_01", onClick: () => alert("01 onClicked !!") },
            { text: "Menu_C_02", onClick: () => alert("02 onClicked !!") },
            { text: "Menu_C_03", onClick: () => alert("03 onClicked !!") },
          ]}
        >
          ドロップダウンメニュー_c
        </DropdownMenu>

        <DropdownMenu
          className="mt-30 right"
          menuList={[
            { text: "Menu_D_01", onClick: () => alert("01 onClicked !!") },
            { text: "Menu_D_02", onClick: () => alert("02 onClicked !!") },
            { text: "Menu_D_03", onClick: () => alert("03 onClicked !!") },
          ]}
        >
          ドロップダウンメニュー_D
        </DropdownMenu>
      </Styled>
    </Layout>
  );
};

const Styled = styled.div`
  background: #f5f5f5;
  padding: 30px;
  .mt-30 {
    margin: 30px 0 300px 0;
    display: block;
    &:last-of-type {
      margin-bottom: 0;
    }
    &.right {
      text-align: right;
    }
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

export default DropdownMenuExample;
