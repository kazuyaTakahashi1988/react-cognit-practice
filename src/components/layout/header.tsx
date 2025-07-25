import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { params } from "../../lib/style";
import { GetSignInFlag } from "../../utils/authHelper";
import DropdownMenu from "../dropdownMenu/dropdownMenu";

import type { TypeHeader } from "../../lib/types";
import type React from "react";

export const Header: React.FC<TypeHeader> = (props) => {
  const { type } = props;
  const navigate = useNavigate();

  return (
    <Styled>
      <h1 className="logo">LOGO</h1>
      <nav className="nav">
        <ul className="pc-only">
          {type === "example" && (
            <>
              <li>
                <NavLink end to="/example/form_example">
                  Form
                </NavLink>
              </li>
              <li>
                <NavLink end to="/example/todo_example">
                  Todo
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
            </>
          )}
          {type === "auth" && !GetSignInFlag() && (
            <>
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
            </>
          )}
          {type === "auth" && GetSignInFlag() && (
            <>
              <li>
                <NavLink end to="/auth/signout">
                  SignOut
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <ul className="sp-only">
          {type === "example" && (
            <>
              <li>
                <DropdownMenu
                  menuList={[
                    {
                      text: "Form",
                      onClick: () => navigate("/example/form_example", { replace: true }),
                    },
                    {
                      text: "Todo",
                      onClick: () => navigate("/example/todo_example", { replace: true }),
                    },
                    {
                      text: "Modal",
                      onClick: () => navigate("/example/modal_example", { replace: true }),
                    },
                    {
                      text: "Accordion",
                      onClick: () =>
                        navigate("/example/accordion_example", {
                          replace: true,
                        }),
                    },
                    {
                      text: "DropdownMenu",
                      onClick: () =>
                        navigate("/example/dropdownmenu_example", {
                          replace: true,
                        }),
                    },
                  ]}
                >
                  <a>Example</a>
                </DropdownMenu>
              </li>
            </>
          )}
          {type === "auth" && !GetSignInFlag() && (
            <>
              <li>
                <DropdownMenu
                  menuList={[
                    {
                      text: "SighIn",
                      onClick: () => navigate("/auth/signin", { replace: true }),
                    },
                    {
                      text: "SighUp",
                      onClick: () => navigate("/auth/signup", { replace: true }),
                    },
                    {
                      text: "Verification",
                      onClick: () => navigate("/auth/verification", { replace: true }),
                    },
                  ]}
                >
                  <a>Auth</a>
                </DropdownMenu>
              </li>
            </>
          )}
          {type === "auth" && GetSignInFlag() && (
            <>
              <li>
                <DropdownMenu
                  menuList={[
                    {
                      text: "SignOut",
                      onClick: () => navigate("/auth/signOut", { replace: true }),
                    },
                  ]}
                >
                  <a>Auth</a>
                </DropdownMenu>
              </li>
            </>
          )}
        </ul>
      </nav>
    </Styled>
  );
};

const Styled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px ${params.gray};
  > .logo {
    font-size: 24px;
    line-height: 26px;
    text-align: center;
    padding: 10px 20px;
    border: 10px solid ${params.white};
    background: ${params.gray};
  }
  > .nav {
    > ul {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 0 10px;
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
  }
`;

export default Header;
