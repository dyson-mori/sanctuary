import styled, { css } from "styled-components";

export const Container = styled.button`
  position: fixed;

  right: 50px;
  top: 40%;
  transform: translateY(-40%);

  width: 50px;
  height: 50px;

  background-color: #fff;

  ${({ theme }) => css`
    border-radius: ${theme.border.small};
    box-shadow: ${theme.box.shadow.modal};

    svg {
      fill: ${theme.colors.primary};
    }
  `};
`;

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  /* width: 100%;
  height: 100%; */

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