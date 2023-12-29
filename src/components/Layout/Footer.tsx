import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { params } from "../../lib/";

export const Footer: React.FC = () => {
  return (
    <Styled>
      <ul className="nav">
        <li>
          <NavLink to="/example">Example</NavLink>
        </li>
        <li>
          <NavLink to="/auth">Auth</NavLink>
        </li>
      </ul>
    </Styled>
  );
};

const Styled = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px ${params.gray};
  > .nav {
    display: flex;
    justify-content: center;
    width: 100%;
    > li {
      a {
        display: block;
        padding: 10px;
        font-weight: bold;
        &.active {
          color: ${params.primary};
        }
      }
    }
  }
`;

export default Footer;
