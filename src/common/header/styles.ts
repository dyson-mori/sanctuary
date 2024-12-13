import styled, { css } from "styled-components";

export const Container = styled.header`
  display: flex;

  height: 50px;

  padding: 0 25px;

  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    box-shadow: ${theme.box.shadow.header};
  `};
`;

export const Logo = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;

  /* margin-left: 20px; */
  margin-right: 50px;
`;

export const Nav = styled.nav`
  display: flex;

  align-items: center;

  height: 50px;

  width: 100%;

  a {
    padding: 10px;
    font-family: var(--font-montserrat);
    color: #707070;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
  }
`;

export const Button = styled.button`
  cursor: pointer;

  border: 0;
  outline: 0;
  background-color: transparent;

  display: flex;

  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;

  /* margin-right: 20px; */
`;