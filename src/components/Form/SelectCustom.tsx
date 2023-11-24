import React, { forwardRef, useState, useEffect, useRef, createRef, RefObject } from 'react';
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion';
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
    if (selectedIndex !== null) {
      labelRefs.current[selectedIndex].current?.classList.add('current');
    }
  }, [selectedIndex, isOpen]);

  return (
    <Styled>
      {label && <Label label={label} />}

      <div className='select' ref={selectRef}>
        <div
          className={`selected ${isOpen ? "is-open" : ""}`}
          onClick={(e) => onOpenToggle(e)}
        >
          {placeholder && <span className='placeholder'>{placeholder}</span>}
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

        <AnimatePresence>
          {isOpen &&
            <motion.div
              className="select-box"
              initial={{ height: 0 }}
              animate={{ height: '150px' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
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
            </motion.div>
          }
        </AnimatePresence>
      </div>

      {errors && Object.values(errors).map((error, index) => {
        return error.ref.name === rest.name && <ErrorMessage key={index} errorMessage={error.message} />
      })}
    </Styled>
  )
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
      box-shadow: 0 0 0 1px #ccc;
      background: #fff;
      cursor: pointer;
      &.is-open {
        border-radius: 4px 4px 0 0;
        box-shadow: 0 0 0 1px rgb(33, 150, 243);
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
        border-top: 2px solid #333;
        border-right: 2px solid #333;
        transform: rotate(135deg);
        pointer-events: none;
        z-index: 2;
        transition: 0.2s ease-out;
      }
      > .placeholder {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &__label {
        width: 0px;
        height: 0px;
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
          background: #fff;
          padding: 0 25px 0 8px;
          border-radius: 4px;
          position: absolute;
          z-index: 1;
          top: 50%;
          left: 50%;
          transform: translateY(-50%) translateX(-50%);
          width: 100%;
          height: 2.4em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: none;
        }
      }
    }
    .select-box {
      position: absolute;
      z-index: 1;
      top: calc(100% + 1px);
      left: 0;
      right: 0;
      margin: auto;
      border-radius: 0 0 4px 4px;
      border: none;
      box-shadow: 0 1px 0 0 #ccc, 1px 0 0 0 #ccc, -1px 0 0 0 #ccc;
      width: 100%;
      background: #fff;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: contain;
      &__label {
        display: block;
        padding: 0 10px;
        cursor: pointer;
        font-size: 16px;
        line-height: 2.4em;
        color: #666;
        &.current {
          color: #fff;
          background: rgb(33, 150, 243);
        }
      }
    }
  }
`;

export const SelectCustom = forwardRef(SelectCustomField);
export default SelectCustom;