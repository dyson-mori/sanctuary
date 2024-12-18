import styled, { css } from "styled-components";

export const Container = styled.main`
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;

  .down {
    opacity: 0;
    margin-left: -10px;
    z-index: 0;
  };

  .up {
    opacity: 1;
    z-index: 2;
  }
`;

export const Content = styled.form`
  position: relative;

  display: flex;

  justify-content: center;
  align-items: center;

  width: 100%;
  height: 450px;
`;

export const Form = styled.section`
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 400px;
  height: 400px;
`;

export const Footer = styled.footer`
  display: flex;

  justify-content: space-between;
  align-items: center;

  width: 400px;

  p {
    font-size: 12px;
  }

  button, p {
    display: flex;

    justify-content: center;
    align-items: center;

    padding: 5px 0;

    font-weight: 500;

    ${({ theme }) => css`
      color: ${theme.colors.text};
    `};
  };
`;