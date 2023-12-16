import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PropsAccordion } from "../../lib/props";

export const Accordion: React.FC<PropsAccordion> = (props) => {
  const { title, initOpen, children } = props;
  const [isOpen, setIsOpen] = useState(initOpen);

  useEffect(() => {
    setIsOpen(initOpen);
  }, [initOpen]);

  return (
    <Styled>
      <div className={["accordion", `${isOpen ? "is-open" : ""}`].join(" ")}>
        <div className="accordion__title" onClick={() => setIsOpen(!isOpen)}>
          {title}
        </div>

        {isOpen && <div className="accordion__container">{children}</div>}
      </div>
    </Styled>
  );
};

const Styled = styled.div`
  .accordion {
    border-bottom: 1px solid #ccc;
    display: block;
    &__title {
      font-size: 16px;
      line-height: 28px;
      cursor: pointer;
      display: block;
      position: relative;
      padding: 10px;
      &:before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        right: 12px;
        width: 8px;
        height: 8px;
        border-top: 2px solid #333;
        border-right: 2px solid #333;
        transform: rotate(135deg);
        pointer-events: none;
        z-index: 1;
        transition: 0.2s ease-out;
      }
    }
    &.is-open > .accordion__title:before {
      transform: rotate(-45deg);
    }
    &__container {
      display: block;
      overflow: hidden;
      font-size: 16px;
      line-height: 28px;
      padding: 10px 10px 20px;
      transition: 0.2s ease-out;
      animation: fadeIn 0.2s linear forwards;
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

export default Accordion;
