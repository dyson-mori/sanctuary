import styled, { css } from "styled-components";

export const Container = styled.main`
  display: flex;

  justify-content: center;
  flex-wrap: wrap;

  width: 100%;
`;

export const Button = styled.button`
  border: 0;
  outline: 0;

  display: flex;

  justify-content: center;
  align-items: center;

  border-radius: 3px;

  min-width: 50px;

  padding: 8px 10px;
  margin: 5px;

  ${({ theme, disabled }) => css`
    background-color: ${theme.colors.white};
    box-shadow: ${theme.box.shadow.header};

    opacity: ${disabled ? 0.8 : 1};
    cursor: ${disabled ? 'default' : 'pointer'};
  `};

  color: #707070;

  font-size: 15px;
  font-weight: 500;

  font-family: var(--font-montserrat), sans-serif;
`;

export const Footer = styled.footer`
  position: absolute;

  bottom: 0;

  height: 70px;

  display: flex;

  justify-content: center;
  align-items: center;

  width: 100%;
`;

export const NewCategory = styled.button`
  position: absolute;

  padding: 0;
  margin: 0;

  display: flex;

  justify-content: center;
  align-items: center;

  bottom: 20px;
  right: 20px;

  width: 50px;
  height: 50px;
  border-radius: 50px;

  ${({ theme }) => css`
    box-shadow: ${theme.box.shadow.default};
    background-color: ${theme.colors.primary};
  `};
`;