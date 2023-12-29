import React, { forwardRef } from "react";
import styled from "styled-components";
import { params } from "../../lib/Style";
import { PropsModal } from "../../lib/Props";

import Button from "../../components/Button/Button";

type Props = React.HTMLAttributes<HTMLDivElement> & PropsModal;

export const ModalField: React.ForwardRefRenderFunction<
  HTMLDivElement,
  Props
> = (props, ref) => {
  const { children, title, onEvent, onClose, ...rest } = props;

  return (
    <Styled
      ref={ref}
      {...rest}
      className={["modal", `${rest.className ? rest.className : ""}`].join(" ")}
      onClick={onClose?.onClick}
    >
      <div className="modal__inner" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <p className="title">{title}</p>
          <span className="close" onClick={onClose.onClick}></span>
        </div>
        <div className="modal__container">{children}</div>
        <div className="modal__footer">
          {onClose.text && (
            <Button className="secondary" onClick={onClose.onClick}>
              {onClose.text}
            </Button>
          )}
          {onEvent && <Button onClick={onEvent.onClick}>{onEvent.text}</Button>}
        </div>
      </div>
    </Styled>
  );
};

const Styled = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  animation: fadeIn 0.2s ease-out forwards;
  &::before {
    content: "";
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh);
    background: ${params.black};
    opacity: 0.3;
  }
  .modal {
    &__inner {
      position: fixed;
      z-index: 9999;
      top: 50%;
      left: 50%;
      max-width: 500px;
      width: calc(100% - 40px);
      border-radius: 10px 10px 5px 5px;
      text-align: left;
      animation: translateY 0.2s ease-out forwards;
      background: ${params.white};
      box-shadow: 0 0 0 1px ${params.gray};
      > * {
        padding-left: 20px;
        padding-right: 20px;
      }
    }
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 10px 10px 0 0;
      height: 50px;
      overflow: hidden;
      background: ${params.primary};
      color: ${params.white};
      .title {
        font-size: 16px;
        line-height: 28px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: calc(100% - 40px);
      }
      .close {
        position: relative;
        z-index: 0;
        width: 20px;
        height: 20px;
        display: block;
        cursor: pointer;
        &:before,
        &:after {
          content: "";
          display: block;
          width: 2px;
          height: 20px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          transform: rotate(135deg);
          z-index: 1;
          background: ${params.white};
        }
        &:after {
          transform: rotate(45deg);
        }
      }
    }
    &__container {
      font-size: 16px;
      line-height: 28px;
      padding-top: 20px;
      padding-bottom: 20px;
      max-height: calc(100svh - 160px);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: contain;
    }
    &__footer {
      border-radius: 0 0 5px 5px;
      display: flex;
      justify-content: right;
      align-items: center;
      height: 70px;
      overflow: hidden;
      border-top: 1px solid ${params.gray};
      > * {
        margin-right: 20px;
        &:last-child {
          margin-right: 0;
        }
      }
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
  @keyframes translateY {
    0% {
      transform: translateY(calc(-50% - 30px)) translateX(-50%);
    }
    100% {
      transform: translateY(-50%) translateX(-50%);
    }
  }
`;

export const Modal = forwardRef(ModalField);
export default Modal;
