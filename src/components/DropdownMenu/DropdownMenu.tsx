import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components'
import { PropsDropdownMenu } from '../../lib/props';

export const DropdownMenu: React.FC<PropsDropdownMenu> = (props): any => {
  const { menuList, children } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isClientBottom, setIsClientBottom] = useState(false);
  const [isClientLeft, setIsClientLeft] = useState(false);

  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const dropdownMenuInnerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleOutsideClick = (e: any) => {
    if (dropdownMenuRef?.current && !dropdownMenuRef?.current.contains(e.target)) {
      setIsOpen(false);
    }
    e.stopPropagation();
  };

  useEffect(() => {
    if(isOpen) {
      const refCurrent = dropdownMenuInnerRef?.current;
      const clientRect = refCurrent?.getBoundingClientRect();
      const clientBottom = Number(clientRect?.top) + Number(refCurrent?.clientHeight);
      const clientCenter = Number(clientRect?.left) + (Number(refCurrent?.clientWidth) / 2);
      setIsClientBottom(window.innerHeight < clientBottom);
      setIsClientLeft((window.innerWidth / 2) > clientCenter);
    } else {
      setIsClientBottom(false);
      setIsClientLeft(false);
    }
  }, [isOpen]);

  return (
    <Styled
      className='dropdown-menu'
      ref={dropdownMenuRef}
      onClick={() => setIsOpen(!isOpen)}
    >
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={`
              dropdown-menu__inner
              ${isClientBottom ? "bottom" : ""}
              ${isClientLeft ? "left" : ""}
            `}
            ref={dropdownMenuInnerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: 'ease' }}
            onClick={(e) => { e.stopPropagation() }}
          >
            {menuList.map((menu, index) => (
              <li onClick={menu.onClick} key={index}>
                {menu.text}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </Styled>
  )
};

const Styled = styled.span`
  display: inline-block;
  position: relative;
  cursor: pointer;
  .dropdown-menu {
    &__inner {
      position: absolute;
      z-index: 10;
      top: calc(100% + 10px);
      right: 0;
      border-radius: 6px;
      padding: 5px 10px;
      background: #fff;
      width: max-content;
      display: block;
      filter: drop-shadow(0px 0px 5px #ccc);
      cursor: initial;
      &::before {
        content: '';
        position: absolute;
        width: 16px;
        height: 14px;
        clip-path: polygon(50% 30%, 0% 100%, 100% 100%);
        background-color: #fff;
        top: -13px;
        right: 20px;
        z-index: 10;
      }
      &.bottom {
        top: initial;
        bottom: calc(100% + 10px);
        &::before {
          top: initial;
          bottom: -13px;
          transform: rotate(180deg);
        }
      }
      &.left {
        right: initial;
        left: 0;
        &::before {
          right: initial;
          left: 20px;
        }
      }
      > li {
        font-size: 16px;
        line-height: 28px;
        padding: 5px 0;
        cursor: pointer;
      }
    }
  }
`;

export default DropdownMenu;
