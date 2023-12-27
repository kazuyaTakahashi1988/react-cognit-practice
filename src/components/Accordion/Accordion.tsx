import React, { forwardRef, useState, useEffect } from "react";
import styled from "styled-components";
import { PropsAccordion } from "../../lib/props";

type Props = React.HTMLAttributes<HTMLDivElement> & PropsAccordion;

export const AccordionField: React.ForwardRefRenderFunction<
  HTMLDivElement,
  Props
> = (props, ref) => {
  const { title, initOpen, children, ...rest } = props;
  const [isOpen, setIsOpen] = useState(initOpen);

  useEffect(() => {
    setIsOpen(initOpen);
  }, [initOpen]);

  return (
    <Styled ref={ref} {...rest}>
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
    display: block;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 1px;
      background: #ccc;
    }
    &.is-open::after {
      animation: fadeTranslateY 0.2s linear forwards;
    }
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
      animation: fadeTranslateY 0.2s linear forwards;
    }
  }
  @keyframes fadeTranslateY {
    0% {
      opacity: 0;
      transform: translateY(-7.5px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Accordion = forwardRef(AccordionField);
export default Accordion;
