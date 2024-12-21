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
  display: flex;

  align-items: center;
  flex-direction: column;

  width: 400px;

  padding: 20px;

  .header {
    display: flex;
    align-items: center;

    width: 100%;

    margin-bottom: 10px;
  };

  .header > .label {
    padding: 0 15px;

    > h4 {
      font-weight: 600;
      margin-bottom: 5px;
    }
  }

  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    border-radius: ${theme.border.large};
    box-shadow: ${theme.box.shadow.input};

    h4 {
      color: ${theme.colors.dark_charcoal};
    };

    p {
      color: ${theme.colors.philippine_gray};
      font-size: ${theme.font.size.large};
    }
  `};
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