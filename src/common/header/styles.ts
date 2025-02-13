import styled, { css } from "styled-components";

export const Container = styled.header`
  display: flex;

  height: 50px;

  padding: 0 25px;

  z-index: 10;

  ${({ theme }) => css`
    background-color: ${theme.header.background};
    box-shadow: ${theme.header.box_shadow};
  `};

  @media only screen and (max-width: 600px) {
    padding: 0 10px;
  };
`;

export const Logo = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;

  margin-right: 50px;

  @media only screen and (max-width: 600px) {
    margin-right: 25px;
  };
`;

export const Nav = styled.nav`
  display: flex;

  align-items: center;

  height: 50px;

  width: 100%;

  a {
    padding: 10px;
    font-size: 13px;
    text-decoration: none;
  };
  

  @media only screen and (max-width: 600px) {
    a {
      padding: 10px 5px;
    }
  };
`;
