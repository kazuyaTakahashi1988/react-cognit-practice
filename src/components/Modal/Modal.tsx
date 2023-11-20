import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components'
import { PropsModal } from '../../lib/props';
import Button from '../../components/Button/Button';

export const Modal: React.FC<PropsModal> = (props): any => {
  const { children, title, text, button } = props;
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = (e: any) => {
    setIsOpen(true)
    document.addEventListener('click', onClose)
    e.stopPropagation()
  }

  const onClose = useCallback(() => {
    setIsOpen(false)
    document.removeEventListener('click', onClose)
  }, [])

  useEffect(() => {
    return () => {
      document.removeEventListener('click', onClose)
    }
  }, [onClose])

  return <>
    <Styled onClick={(e) => { !isOpen ? onOpen(e) : onClose() }}>
      {children}
    </Styled>

    <AnimatePresence>
      {isOpen &&
        <StyledModal>
          <motion.div
            className="modal"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div className='modal__inner' onClick={(e) => { e.stopPropagation() }}>
              <div className="modal__header">
                <p className="title">{title}</p>
                <span className='close' onClick={onClose}></span>
              </div>
              <div className="modal__container">
                {text}
              </div>
              <div className="modal__footer">
                <Button
                  type={'secondary'}
                  onClick={onClose}
                  isDisable={false}
                >
                  閉じる
                </Button>
                {button &&
                  <Button
                    type={undefined}
                    onClick={button.onClick}
                    isDisable={false}
                  >
                    {button.text}
                  </Button>
                }
              </div>
            </div>
          </motion.div>
        </StyledModal>
      }
    </AnimatePresence>
  </>
};
const Styled = styled.span`
  cursor: pointer;
  display: inline-block;
`;

const StyledModal = styled.span`
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
      z-index: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: calc(100vh + 40px);
      background: rgba(0,0,0,0.3);
    }
    &__inner {
      position: fixed;
      z-index: 9999;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      max-width: 500px;
      width: calc(100% - 40px);
      background: #fff;
      box-shadow: 0 0 0 1px #ccc;
      border-radius: 10px 10px 5px 5px;
      text-align: left;
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
        &:before, &:after {
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
      max-height: calc(100vh - 160px);
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
`;

export default Modal;