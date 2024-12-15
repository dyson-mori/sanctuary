import styled, { css } from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;

  height: 50px;
  min-height: 50px;

  overflow: hidden;

  ${({ theme }) => css`
    box-shadow: ${theme.box.shadow.default};
    border-radius: ${theme.border.small};
  `};

  span {
    min-width: 50px;
    height: 50px;
    background-color: #fff;
  };

  span > svg {
    position: relative;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  };

  input {
    border: 0;
    outline: 0;

    width: 100%;
  };

  button {
    display: flex;

    border: 0;

    background-color: #fff;

    align-items: center;
    justify-content: center;

    min-width: 50px;
    height: 50px;
  };

  .show {
    display: block;
  };

  .hide {
    display: none;
  };
`;
