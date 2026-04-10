import { forwardRef, useEffect, useId, useRef, useState } from "react";
import styled from "styled-components";

import { color } from "../../lib/style";

import type { TypeDropdownMenu } from "../../lib/types";
import type React from "react";

type Props = React.HTMLAttributes<HTMLSpanElement> & TypeDropdownMenu;

/* -----------------------------------------------
 * ドロップダウンメニュー
 * ----------------------------------------------- */

export const DropdownMenuField: React.ForwardRefRenderFunction<HTMLSpanElement, Props> = (
  props,
  ref,
) => {
  const { menuList, children, ...rest } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isClientBottom, setIsClientBottom] = useState(false);
  const [isClientLeft, setIsClientLeft] = useState(false);
  const menuId = useId();

  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const dropdownMenuInnerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleOutsideClick = (e: Event) => {
    if (e.target instanceof HTMLElement && !dropdownMenuRef?.current?.contains(e.target)) {
      setIsOpen(false);
    }
    e.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
      const refCurrent = dropdownMenuInnerRef?.current;
      const clientRect = refCurrent?.getBoundingClientRect();
      const clientBottom = Number(clientRect?.top) + Number(refCurrent?.clientHeight);
      const clientCenter = Number(clientRect?.left) + Number(refCurrent?.clientWidth) / 2;
      setIsClientBottom(window.innerHeight < clientBottom);
      setIsClientLeft(window.innerWidth / 2 > clientCenter);
    } else {
      setIsClientBottom(false);
      setIsClientLeft(false);
    }
  }, [isOpen]);

  return (
    <Styled ref={ref} {...rest}>
      <div className="dropdown-menu" ref={dropdownMenuRef}>
        <button
          aria-controls={menuId}
          aria-expanded={isOpen}
          className="dropdown-menu__trigger"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          {children}
        </button>

        {isOpen && (
          <ul
            className={[
              "dropdown-menu__inner",
              `${isClientBottom ? "bottom" : ""}`,
              `${isClientLeft ? "left" : ""}`,
            ].join(" ")}
            id={menuId}
            ref={dropdownMenuInnerRef}
          >
            {menuList.map((menu) => (
              <li key={menu.text}>
                <button
                  className="dropdown-menu__item"
                  onClick={(event) => {
                    menu.onClick?.(event);
                    setIsOpen(false);
                  }}
                  type="button"
                >
                  {menu.text}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Styled>
  );
};

const Styled = styled.span`
  .dropdown-menu {
    display: inline-block;
    position: relative;
    &__trigger {
      appearance: none;
      background: none;
      border: 0;
      color: inherit;
      cursor: pointer;
      display: inline-block;
      font: inherit;
      margin: 0;
      padding: 0;
      text-align: inherit;
    }
    &__inner {
      position: absolute;
      z-index: 10;
      top: calc(100% + 10px);
      right: 0;
      border-radius: 6px;
      padding: 5px 10px;
      background: ${color.white};
      width: max-content;
      display: block;
      cursor: initial;
      animation: fadeIn 0.1s ease forwards;
      filter: drop-shadow(0px 0px 5px ${color.gray});
      &::before {
        content: "";
        position: absolute;
        width: 16px;
        height: 14px;
        clip-path: polygon(50% 30%, 0% 100%, 100% 100%);
        background-color: ${color.white};
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
        display: block;
      }
    }
    &__item {
      appearance: none;
      background: none;
      border: 0;
      color: inherit;
      cursor: pointer;
      display: block;
      font-size: 16px;
      line-height: 28px;
      padding: 5px 0;
      text-align: left;
      width: 100%;
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

export const DropdownMenu = forwardRef(DropdownMenuField);
export default DropdownMenu;
