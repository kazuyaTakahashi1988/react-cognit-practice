import React from 'react';
import { NavLink } from "react-router-dom";
import styled from 'styled-components'
import { GetSignInFlag } from '../../utils/Auth'

import { PropsHeader } from '../../lib/props';

export const Header: React.FC<PropsHeader> = (props): any => {
  const { type } = props;

  return (
    <Styled>
      <h1 className='logo'>
        LOGO
      </h1>
      <nav className='nav'>
        <ul>
          {type === 'example' && <>
            <li>
              <NavLink end to="/example/form_example">
                Form
              </NavLink>
            </li>
            <li>
              <NavLink end to="/example/modal_example">
                Modal
              </NavLink>
            </li>
            <li>
              <NavLink end to="/example/accordion_example">
                Accordion
              </NavLink>
            </li>
            <li>
              <NavLink end to="/example/dropdownmenu_example">
                DropdownMenu
              </NavLink>
            </li>
          </>}
          {(type === 'auth' && !GetSignInFlag()) && <>
            <li>
              <NavLink end to="/auth/signin">
                SignIn
              </NavLink>
            </li>
            <li>
              <NavLink end to="/auth/signup">
                SignUp
              </NavLink>
            </li>
            <li>
              <NavLink end to="/auth/verification">
                Verification
              </NavLink>
            </li>
          </>}
          {(type === 'auth' && GetSignInFlag()) && <>
            <li>
              <NavLink end to="/auth/signout">
                SignOut
              </NavLink>
            </li>
          </>}
        </ul>
      </nav>
    </Styled>
  )
};

const Styled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px #ccc;
  > .logo {
    font-size: 24px;
    line-height: 26px;
    background: #ccc;
    text-align: center;
    padding: 10px 20px;
    border: 10px solid #fff;
  }
  > .nav {
    > ul {
      display: flex;
      justify-content: space-between;
      width: 100%;
      > li {
        a {
          display: block;
          padding: 10px;
          font-weight: bold;
          &.active {
            color: rgb(33, 150, 243);
          }
        }
      }
    }
  }
`;

export default Header;