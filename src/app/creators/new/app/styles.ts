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

export const Upload = styled.div`
  display: flex;
  position: absolute;

  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 50%;
  /* height: 100%; */

  overflow: hidden;

  padding: 20px 40px;

  transition: .5s;

  label {
    display: flex;

    justify-content: center;
    align-items: center;

    width: 400px;
    height: 400px;

    cursor: pointer;

    background-color: #fff;

    ${({ theme }) => css`
      box-shadow: ${theme.box.shadow.default};
      border-radius: ${theme.border.middle};
    `};
  };
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

  width: 400px;

  button {
    display: flex;

    justify-content: center;
    align-items: center;

    padding: 5px 0;

    font-weight: 500;

    ${({ theme }) => css`
      color: ${theme.colors.text};
    `}
  }
`;