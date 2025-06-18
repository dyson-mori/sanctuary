import styled, { css } from 'styled-components';

import { Variant } from '.';

export const Container = styled.button<{ $variant: Variant }>`
  display: flex;
  position: relative;

  justify-content: center;
  align-items: center;

  border: 0;

  padding: 5px 10px;
  height: 40px;

  cursor: pointer;

  ${({ theme, disabled, $variant }) => css`
    border-radius: ${theme.border.small};
    /* box-shadow: ${theme.box.shadow.default}; */
    
    ${disabled && css`
      cursor: default;
      opacity: .5;
    `};

    ${$variant === 'primary' && css`
      background-color: ${theme.colors.primary};
      color: ${theme.colors.white};
      font-weight: 600;
      width: 250px;
    `};

    ${$variant === 'error' && css`
      background-color: ${theme.colors.error};
      color: ${theme.colors.white};
      font-weight: 600;
      width: 250px;
    `};

    ${$variant === 'select' && css`
      background-color: ${theme.colors.background_button};
      color: ${theme.colors.text};
      font-weight: 600;
      box-shadow: ${theme.box.shadow.input};
    `};
      
      ${$variant === 'selected' && css`
        background-color: ${theme.colors.primary};
        color: ${theme.colors.white};
        font-weight: 600;
        box-shadow: ${theme.box.shadow.select};
    `};

    ${$variant === 'loading' && css`
      background-color: ${theme.colors.primary};
      color: ${theme.colors.white};
      width: 250px;
    `};

    ${$variant === 'white' && css`
      background-color: ${theme.colors.white};
      color: ${theme.colors.granite_gray};
      width: 250px;
    `};

    ${$variant === 'success' && css`
      background-color: ${theme.colors.success};
      color: ${theme.colors.white};
      width: 250px;
      font-weight: 600;
    `};
  `};
`;

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  .lds-dual-ring,
  .lds-dual-ring:after {
    box-sizing: border-box;
  }
  .lds-dual-ring {
    display: inline-block;
    width: 20px;
    height: 20px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2.5px solid currentColor;
    border-color: currentColor transparent currentColor transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// ${({ theme, disabled, primary, secondary }) => primary === 'true' && secondary === 'false' && css`
//   color: ${theme.colors.white};
//   font-weight: ${theme.font.weight[700]};
//   background-color: ${theme.colors[disabled ? 'primary_loading' : 'primary']};
// `};

// ${({ theme, disabled, secondary }) => secondary  === 'true' && css`
//   color: ${theme.colors.primary};
//   font-weight: ${theme.font.weight[500]};
//   border: 1px solid ${theme.colors[disabled ? 'primary_loading' : 'primary']};
//   background-color: ${theme.colors[disabled ? 'primary_loading' : 'background']};
// `};

// ${({ theme, disabled }) => css`
//   box-shadow: ${theme.settings.box.simple};
//   border-radius: ${theme.settings.border.radius.small};
//   cursor: ${disabled ? 'default' : 'pointer'};
// `};