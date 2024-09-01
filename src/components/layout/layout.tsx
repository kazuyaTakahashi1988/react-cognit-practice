import React from "react";
import styled from "styled-components";
import { TypeLayout } from "../../lib/types";
import { Header } from "./header";
import { Footer } from "./footer";


export const Layout: React.FC<TypeLayout> = (props) => {
  const { type, children } = props;

  return (
    <Styled>
      <Header type={type} />
      <div className="container">
        <div className="container__inner">{children}</div>
      </div>
      <Footer />
    </Styled>
  );
};

const Styled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  > .container {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-y: contain;
    animation: fadeIn 0.2s linear forwards;
    > .container__inner {
      padding: 30px;
      max-width: 600px;
      width: 100%;
      margin: 0 auto;
      display: block;
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default Layout;
