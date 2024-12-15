import styled, { css } from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;

  height: 50px;

  .open {
    opacity: 1;
    z-index: 1;
  };

  ${({ theme }) => css`
    box-shadow: ${theme.box.shadow.default};
    border-radius: ${theme.border.small};
  `};

  span, button {
    min-width: 50px;
    height: 50px;
    background-color: #fff;
    ${({ theme }) => css`
      border-radius: ${theme.border.small};
    `};
  };

  span > svg {
    position: relative;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  };

  span > p {
    position: relative;
    
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  };

  input {
    border: 0;
    outline: 0;

    width: 100%;

    ${({ theme }) => css`
      border-radius: ${theme.border.small};
    `};
  };
`;

export const DropDown = styled.div`
  position: absolute;

  top: 55px;

  min-height: 50px;
  max-height: 300px;

  background-color: #fff;

  opacity: 0;
  z-index: -1;
  transition: .2s;

  overflow-y: auto;

  ${({ theme }) => css`
    box-shadow: ${theme.box.shadow.default};
    border-radius: ${theme.border.small};
  `};

  button {
    display: flex;
    align-items: center;

    width: 100%;
    height: 50px;

    text-align: left;

    padding: 0 44px;
    font-weight: 500;

    background-color: #fff;
    color: #707070;

    ${({ theme }) => css`
      border-radius: ${theme.border.small};
    `};
  };

  button:hover {
    background-color: #fafafa;
  };
`;