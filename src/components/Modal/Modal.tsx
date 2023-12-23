import React, { forwardRef } from "react";
import styled from "styled-components";
import { PropsModal } from "../../lib/props";
import Button from "../../components/Button/Button";

type Props = React.HTMLAttributes<HTMLSpanElement> & PropsModal;

export const ModalField: React.ForwardRefRenderFunction<
  HTMLSpanElement,
  Props
> = (props, ref) => {
  const { children, title, onEvent, onClose, ...rest } = props;

  return (
    <Styled ref={ref} {...rest}>
      <div className="modal" onClick={onClose?.onClick}>
        <div
          className="modal__inner"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="modal__header">
            <p className="title">{title}</p>
            <span className="close" onClick={onClose?.onClick}></span>
          </div>
          <div className="modal__container">{children}</div>
          <div className="modal__footer">
            {onClose?.text && (
              <Button className="secondary" onClick={onClose?.onClick}>
                {onClose?.text ? onClose?.text : "閉じる"}
              </Button>
            )}
            {onEvent && (
              <Button onClick={onEvent.onClick}>{onEvent.text}</Button>
            )}
          </div>
        </div>
      </div>
    </Styled>
  );
};

const Styled = styled.span`
  .modal {
    position: fixed;
    z-index: 999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    &::before {
      content: "";
      position: fixed;
      z-index: 999;
      top: 0;
      left: 0;
      width: 100%;
      height: calc(100vh);
      background: rgba(0, 0, 0, 0.3);
    }
    &__inner {
      position: fixed;
      z-index: 9999;
      top: 50%;
      left: 50%;
      max-width: 500px;
      width: calc(100% - 40px);
      background: #fff;
      box-shadow: 0 0 0 1px #ccc;
      border-radius: 10px 10px 5px 5px;
      text-align: left;
      animation: fadeTranslate 0.2s ease-out forwards;
      > * {
        padding-left: 20px;
        padding-right: 20px;
      }
    }
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgb(33, 150, 243);
      color: #fff;
      border-radius: 10px 10px 0 0;
      height: 50px;
      overflow: hidden;
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
          background: #fff;
          z-index: 1;
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
      border-top: 1px solid #ccc;
      display: flex;
      justify-content: right;
      align-items: center;
      height: 70px;
      overflow: hidden;
      > * {
        margin-right: 20px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  @keyframes fadeTranslate {
    0% {
      opacity: 0;
      transform: translateY(calc(-50% - 30px)) translateX(-50%);
    }
    100% {
      opacity: 1;
      transform: translateY(-50%) translateX(-50%);
    }
  }
`;

export const Modal = forwardRef(ModalField);
export default Modal;
