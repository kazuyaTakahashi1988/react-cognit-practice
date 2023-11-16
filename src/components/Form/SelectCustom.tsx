import React, { forwardRef, useState, useEffect, useRef, createRef, RefObject } from 'react';
import styled from 'styled-components'
import { PropsSelectCustom } from '../../lib/props';
import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';

type Props = React.InputHTMLAttributes<HTMLInputElement> & PropsSelectCustom;

export const SelectCustomField: React.ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = (props, ref): any => {
  const { label, options, placeholder, errors, ...rest } = props;

  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (e: any) => {
    if (selectRef?.current && !selectRef?.current.contains(e.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const labelRefs = useRef<RefObject<HTMLLabelElement>[]>([]);
  options.forEach((_, index) => {
    labelRefs.current[index] = createRef<HTMLLabelElement>();
  });
  const onOpenToggle = (e: any) => {
    setSelectedIndex(e.target.getAttribute('data-selected-index'));
    setIsOpen(!isOpen);
  }
  useEffect(() => {
    if(selectedIndex !== null) {
      labelRefs.current[selectedIndex].current?.classList.add('current');
    }
  }, [selectedIndex, isOpen]);

  return (
    <Styled>
      {label && <Label label={label} />}

      <div ref={selectRef}>
        <div
          className={`selected ${isOpen ? "is-open" : ""}`}
          onClick={(e) => onOpenToggle(e)}
        >
          {placeholder && placeholder}
          {options.map((option, index) => (
            <div className="selected__label" key={index}>
              <input
                type="radio"
                id={rest.name + option.value}
                value={option.value}
                ref={ref}
                {...rest}
              />
              <span data-selected-index={index}>
                {option.label}
              </span>
            </div>
          ))}
        </div>

        {isOpen &&
          <div className='select-box'>
            {options.map((option, index) => (
              <label
                htmlFor={rest.name + option.value}
                key={index}
                className="select-box__label"
                ref={labelRefs.current[index]}
              >
                {option.label}
              </label>
            ))}
          </div>
        }
      </div>

      {errors && Object.values(errors).map(error => {
        return error.ref.name === rest.name && <ErrorMessage errorMessage={error.message} />
      })}
    </Styled>
  )
};

const Styled = styled.div`
  position: relative;
  .selected {
    position: relative;
    z-index: 0;
    overflow: hidden;
    height: 2.4em;
    font-size: 16px;
    line-height: 2.4em;
    width: 100%;
    padding: 0 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    cursor: pointer;
    &.is-open {
      border-radius: 4px 4px 0 0;
      border: 1px solid rgb(33, 150, 243);
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
      border-top: 2px solid #333;
      border-right: 2px solid #333;
      transform: rotate(135deg);
      pointer-events: none;
      z-index: 11;
    }
    &__label {
      width: 0px;
      height: 0px;
      input {
        position: absolute;
        white-space: nowrap;
        width: 1px;
        height: 1px;
        overflow: hidden;
        border: 0;
        padding: 0;
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        margin: -1px;
        &:checked + span {
          display: block;
        }
      }
      span {
        padding: 0 8px;
        border-radius: 4px;
        position: absolute;
        z-index: 10;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        background: #fff;
        display: none;
      }
    }
  }
  .select-box {
    position: absolute;
    z-index: 10;
    top: 100%;
    left: 0;
    border: 1px solid #ccc;
    border-top: none;
    width: 100%;
    max-height: 150px;
    background: #fff;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-y: contain;
    &__label {
      display: block;
      padding: 0 10px;
      cursor: pointer;
      position: relative;
      font-size: 16px;
      line-height: 2.4em;
      color: #666;
      &.current {
        color: #fff;
        background: rgb(33, 150, 243);
      }
    }
  }
`;

export const SelectCustom = forwardRef(SelectCustomField);
export default SelectCustom;