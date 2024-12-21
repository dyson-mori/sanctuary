import styled, { css } from "styled-components";

export const Container = styled.div`
  position: absolute;

  display: flex;

  align-items: center;

  /* bottom: 20px; */
  right: 20px;

  width: 350px;
  height: 100px;

  transition: .5s;

  div {
    width: 100%;
  }
  
  ${({ theme }) => css`
    border-radius: ${theme.border.small};
    box-shadow: ${theme.box.shadow.input};
    background-color: ${theme.notification.background};

    div > h4 {
      font-size: ${theme.font.size.large};
      color: ${theme.colors.dark_charcoal};
      margin-bottom: 5px;
    };

    div > p {
      font-size: ${theme.font.size.medium};
      color: ${theme.colors.dark_charcoal};
    };

  `};

  & svg:first-child {
    min-width: 25px;
    margin: 20px
  };

  & button > svg {
    margin: 0px
  };
`;