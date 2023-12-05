import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components'
import { PropsAccordion } from '../../lib/props';

export const Accordion: React.FC<PropsAccordion> = (props): any => {
  const { title, initOpen, children } = props;
  const [isOpen, setIsOpen] = useState(initOpen);

  useEffect(() => {
    setIsOpen(initOpen)
  }, [initOpen])
  
  return (
    <Styled>
      <div className="accordion">
        <div
          className={['accordion__title', `${isOpen ? 'is-open' : ''}`].join(' ')}
          onClick={() => setIsOpen(!isOpen)}
        >
          {title}
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="accordion__inner"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <div className="accordion__container">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Styled>
  )
};

const Styled = styled.div`
  .accordion {
    border-bottom: 1px solid #ccc;
    display: block;
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
      &.is-open::before {
        transform: rotate(-45deg);
      }
    }
    &__inner {
      display: block;
      overflow: hidden;
    }
    &__container {
      font-size: 16px;
      line-height: 28px;
      padding: 10px 10px 20px;
    }
  }
`;

export default Accordion;