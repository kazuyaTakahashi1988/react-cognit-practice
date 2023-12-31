import React from "react";
import styled from "styled-components";
import { params } from "../../lib/Style";
import { NavLink } from "react-router-dom";

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
        <li>
          <a
            href="http://test03.empty-service.com"
            target="_blank"
            rel="noreferrer"
          >
            Storybook
          </a>
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
