import { createRef, forwardRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { ErrorMessage } from "./errorMessage";
import { Label } from "./label";
import { color } from "../../lib/style";

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

  const getOptionKey = (option: TypeSelectCustom["options"][number]) =>
    `${option.value}-${option.label}`;

  return (
    <Styled className={rest.className}>
      <Label label={label} />

      <div className="select" ref={selectRef}>
        <div
          className={[
            "selected",
            `${isOpen ? "is-open" : ""}`,
            `${isDisabled ? DISABLED_CLASS : ""}`,
          ].join(" ")}
        >
          <button className="placeholder" onClick={() => onOpenToggle(null)} type="button">
            {rest.placeholder ? rest.placeholder : ""}
          </button>
          {options.map((option, index) => (
            <div className="selected__option" key={getOptionKey(option)}>
              <input
                {...rest}
                className=""
                disabled={isDisabled || option.disabled}
                id={rest.name + option.value}
                onChange={(event) => {
                  rest.onChange?.(event);
                  setSelectedIndex(index);
                  setIsOpen(false);
                }}
                ref={ref}
                type="radio"
                value={option.value}
              />
              <button
                className={["selected__label", `${option.disabled ? DISABLED_CLASS : ""}`].join(
                  " ",
                )}
                disabled={option.disabled || isDisabled}
                onClick={() => {
                  if (option.disabled || isDisabled) return;
                  onOpenToggle(index);
                }}
                type="button"
              >
                <span>{option.label}</span>
              </button>
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
                key={getOptionKey(option)}
                ref={labelRefs.current[index]}
              >
                {option.label}
              </label>
            ))}
          </div>
        )}
      </div>

      <ErrorMessage errorMessage={errorMessage} />
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
      box-shadow: 0 0 0 1px ${color.gray};
      background: ${color.white};
      cursor: pointer;
      &.is-disabled {
        cursor: not-allowed;
        background: ${color.gray};
        color: ${color.gray100};
      }
      &.is-open {
        border-radius: 4px 4px 0 0;
        box-shadow: 0 0 0 1px ${color.primary};
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
        border-top: 2px solid ${color.gray50};
        border-right: 2px solid ${color.gray50};
      }
      > .placeholder {
        appearance: none;
        background: none;
        border: 0;
        color: inherit;
        cursor: pointer;
        font: inherit;
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
        text-align: left;
      }
      &__option {
        width: 0px;
        height: 0px;
        > input {
          position: absolute;
          top: 0;
          left: 0;
          width: 0px;
          height: 0px;
          white-space: nowrap;
          overflow: hidden;
          border: 0;
          padding: 0;
          clip: rect(0 0 0 0);
          clip-path: inset(50%);
          margin: -1px;
          pointer-events: none;
          opacity: 0;
          &:checked + .selected__label > span {
            display: block;
          }
        }
      }
      &__label {
        appearance: none;
        background: none;
        border: 0;
        color: inherit;
        cursor: pointer;
        display: block;
        font: inherit;
        padding: 0;
        text-align: left;
        width: 0px;
        height: 0px;
        &.is-disabled {
          cursor: not-allowed;
        }
        &:disabled {
          cursor: not-allowed;
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
          background: ${color.white};
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
        0 1px 0 0 ${color.gray},
        1px 0 0 0 ${color.gray},
        -1px 0 0 0 ${color.gray};
      background: ${color.white};
      &__label {
        display: block;
        padding: 0 10px;
        font-size: 16px;
        line-height: 2.4em;
        cursor: pointer;
        color: ${color.gray100};
        &.current {
          color: ${color.white};
          background: ${color.primary};
        }
        &.is-disabled {
          cursor: not-allowed;
          color: ${color.gray};
          background: ${color.gray};
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
