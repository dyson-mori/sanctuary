import styled, { css } from "styled-components";

type Variant = 'primary' | 'select' | 'selected' | 'error' | 'loading';

export const Container = styled.div<{ variant: Variant }>`
  position: relative;
  display: flex;

  width: 100%;
  height: 50px;
  min-height: 50px;

  overflow: hidden;

  ${({ theme, variant }) => css`
    box-shadow: ${theme.box.shadow.default};
    
    ${variant === 'primary' && css`
      box-shadow: ${theme.box.shadow.input};
    `};

    border-radius: ${theme.border.small};

    input {
      background-color: ${theme.colors.background_modal};
      color: ${theme.colors.text};
    };

    span {
      background-color: ${theme.colors.background_modal};
    }
  `};

  span {
    min-width: 50px;
    height: 50px;
    /* background-color: #fff; */
  };

  span > svg {
    position: relative;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    ${({ theme }) => css`
      stroke: ${theme.colors.primary};
    `};
  };

  input {
    border: 0;
    outline: 0;

    width: 100%;
  };

  button {
    display: flex;

    border: 0;

    /* background-color: #fff; */

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

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active{
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
`;
