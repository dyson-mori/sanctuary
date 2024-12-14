import styled, { css } from 'styled-components';

export const Container = styled.button`
  display: flex;
  position: relative;

  justify-content: center;
  align-items: center;

  border: 0;

  height: 50px;

  cursor: pointer;

  ${({ theme, disabled }) => css`
    border-radius: ${theme.border.small};
    box-shadow: ${theme.box.shadow.input};
    
    ${disabled && css`
      cursor: default;
      opacity: .5;
    `}
  `};
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    display: inline-block;
    width: 2px;
    height: 5px;
    background: white;
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  };

  div:nth-child(1) {
    margin-left: 0px;
    animation-delay: -0.24s;
  }
  div:nth-child(2) {
    margin-left: 5px;
    animation-delay: -0.12s;
  }
  div:nth-child(3) {
    margin-left: 5px;
    animation-delay: 0s;
  }
  @keyframes lds-facebook {
    0% {
      top: 8px;
      height: 30px;
    }
    50%, 100% {
      top: 24px;
      height: 0px;
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