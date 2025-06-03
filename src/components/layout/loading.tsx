import React from "react";
import styled from "styled-components";

import { params } from "../../lib/style";

export const Loading: React.FC = () => {
  return (
    <Styled>
      <div className="loading"></div>
    </Styled>
  );
};

const Styled = styled.div`
  background: rgba(255, 255, 255, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999999;
  animation: fadeIn 0.3s ease forwards;
  > .loading {
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100px;
    padding: 16px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: ${params.primary};
    z-index: 9999999;
    --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
    mask: var(--_m);
    -webkit-mask-composite: source-out;
    mask-composite: subtract;
    animation: l3 1s infinite linear;
  }
  @keyframes l3 {
    0% {
      transform: rotate(0turn);
    }
    100% {
      transform: rotate(1turn);
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

export default Loading;
