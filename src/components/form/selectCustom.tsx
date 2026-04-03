import { createRef, forwardRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { ErrorMessage } from "./errorMessage";
import { Label } from "./label";
import { params } from "../../lib/style";

import type { TypeSelectCustom } from "../../lib/types";
import type React from "react";
import type { RefObject } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & TypeSelectCustom;
const SELECT_BOX_LABEL_CLASS = "select-box__label";
const DISABLED_CLASS = "is-disabled";

/* -----------------------------------------------
 * セレクトカスタムボックス項目
 * ----------------------------------------------- */

export const SelectCustomField: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (
  props,
  ref,
) => {
  const { label, options, errorMessage, ...rest } = props;
  const isDisabled = rest.disabled || false;

  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (e: Event) => {
    if (e.target instanceof HTMLElement && !selectRef?.current?.contains(e.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const labelRefs = useRef<RefObject<HTMLLabelElement>[]>([]);
  options.forEach((_, index) => {
    labelRefs.current[index] = createRef<HTMLLabelElement>();
  });
  const onOpenToggle = (e: number | null) => {
    if (isDisabled) return;
    setSelectedIndex(e);
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (selectedIndex !== null) {
      labelRefs.current[selectedIndex].current?.classList.add("current");
    }
  }, [selectedIndex, isOpen]);

  return (
    <Styled className={rest.className}>
      {label && <Label label={label} />}

      <div className="select" ref={selectRef}>
        <div
          className={[
            "selected",
            `${isOpen ? "is-open" : ""}`,
            `${isDisabled ? DISABLED_CLASS : ""}`,
          ].join(" ")}
        >
          <span className="placeholder" onClick={() => onOpenToggle(null)}>
            {rest.placeholder ? rest.placeholder : ""}
          </span>
          {options.map((option, index) => (
            <div
              className={["selected__label", `${option.disabled ? DISABLED_CLASS : ""}`].join(" ")}
              key={index}
              onClick={() => {
                if (option.disabled || isDisabled) return;
                onOpenToggle(index);
              }}
            >
              <input
                {...rest}
                className=""
                disabled={isDisabled || option.disabled}
                id={rest.name + option.value}
                ref={ref}
                type="radio"
                value={option.value}
              />
              <span>{option.label}</span>
            </div>
          ))}
        </div>

        {isOpen && (
          <div className="select-box">
            {options.map((option, index) => (
              <label
                aria-disabled={isDisabled || option.disabled}
                className={[
                  SELECT_BOX_LABEL_CLASS,
                  `${option.disabled || isDisabled ? DISABLED_CLASS : ""}`,
                ].join(" ")}
                htmlFor={rest.name + option.value}
                key={index}
                onClick={(e) => {
                  if (isDisabled || option.disabled) e.preventDefault();
                }}
                ref={labelRefs.current[index]}
              >
                {option.label}
              </label>
            ))}
          </div>
        )}
      </div>

      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </Styled>
  );
};

const Styled = styled.div`
  .select {
    position: relative;
    .selected {
      position: relative;
      z-index: 0;
      height: 2.4em;
      font-size: 16px;
      line-height: 2.4em;
      width: 100%;
      padding: 0 25px 0 8px;
      border-radius: 4px;
      border: none;
      box-shadow: 0 0 0 1px ${params.gray};
      background: ${params.white};
      cursor: pointer;
      &.is-disabled {
        cursor: not-allowed;
        background: ${params.gray};
        color: ${params.gray100};
      }
      &.is-open {
        border-radius: 4px 4px 0 0;
        box-shadow: 0 0 0 1px ${params.primary};
        &::before {
          transform: rotate(-45deg);
        }
      }
      &:before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        right: 12px;
        width: 8px;
        height: 8px;
        transform: rotate(135deg);
        pointer-events: none;
        z-index: 3;
        transition: 0.2s ease-out;
        border-top: 2px solid ${params.gray50};
        border-right: 2px solid ${params.gray50};
      }
      > .placeholder {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        width: 100%;
        height: 2.4em;
        padding: 0 10px;
      }
      &__label {
        width: 0px;
        height: 0px;
        &.is-disabled {
          cursor: not-allowed;
        }
        > input {
          position: absolute;
          top: 0;
          left: 0;
          width: 0px;
          height: 0px;
          white-space: nowrap;
          width: 0px;
          height: 0px;
          overflow: hidden;
          border: 0;
          padding: 0;
          clip: rect(0 0 0 0);
          clip-path: inset(50%);
          margin: -1px;
          pointer-events: none;
          opacity: 0;
          &:checked + span {
            display: block;
          }
        }
        > span {
          padding: 0 25px 0 8px;
          border-radius: 4px;
          position: absolute;
          z-index: 2;
          top: 50%;
          left: 50%;
          transform: translateY(-50%) translateX(-50%);
          width: 100%;
          height: 2.4em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: none;
          background: ${params.white};
        }
      }
    }
    .select-box {
      position: absolute;
      z-index: 10;
      top: calc(100% + 1px);
      left: 0;
      right: 0;
      margin: auto;
      border-radius: 0 0 4px 4px;
      border: none;
      width: 100%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: contain;
      height: 150px;
      animation: fadeIn 0.1s ease forwards;
      box-shadow:
        0 1px 0 0 ${params.gray},
        1px 0 0 0 ${params.gray},
        -1px 0 0 0 ${params.gray};
      background: ${params.white};
      &__label {
        display: block;
        padding: 0 10px;
        font-size: 16px;
        line-height: 2.4em;
        cursor: pointer;
        color: ${params.gray100};
        &.current {
          color: ${params.white};
          background: ${params.primary};
        }
        &.is-disabled {
          cursor: not-allowed;
          color: ${params.gray};
          background: ${params.gray};
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
`;

export const SelectCustom = forwardRef(SelectCustomField);
export default SelectCustom;
