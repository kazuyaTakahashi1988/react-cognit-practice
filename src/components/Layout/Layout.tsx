import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components'
import { PropsLayout } from '../../lib/props';

import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

export const Layout: React.FC<PropsLayout> = (props): any => {
  const { type, children  } = props;

  return (
    <Styled>
      <Header type={type} />
      <AnimatePresence mode="wait">
        <motion.div
          className="layout"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <div className="container">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </Styled>
  )
};

const Styled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  > .layout {
    flex: 1;
    overflow-y: scroll;
    padding: 30px;
    > .container {
      max-width: 600px;
      width: 100%;
      margin: 0 auto;
    }
  }
`;

export default Layout;