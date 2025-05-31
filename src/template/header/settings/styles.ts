import styled, { css } from "styled-components";
import { Modal } from "@common";

export const Container = styled(Modal)`
  display: flex;

  flex-direction: column;

  width: 40%;
  /* padding: 30px 20px; */

  a {
    text-decoration: none;
  };

  .info {
    text-align: start;
  }

  ${({ theme }) => css`
    background-color: ${theme.colors.background_modal};

    h3 {
      color: ${theme.colors.text_title};
    };

    .description {
      color: ${theme.colors.text};
      font-size: ${theme.font.size.medium};
      margin: 5px 0 10px 0;
    };

    .version {
      width: 100%;
      text-align: center;

      margin: 50px 0 0 0;

      p {
        color: ${theme.colors.text};
        font-size: ${theme.font.size.medium};
      }
    }
  `};
`;

export const Card = styled.button`
  display: flex;

  align-items: center;
  justify-content: space-between;

  padding: 0 30px;
  margin: 5px 0;

  height: 70px;

  width: 100%;

  ${({ theme }) => css`
    box-shadow: ${theme.box.shadow.default};
    border-radius: ${theme.border.small};

    h4 {
      color: ${theme.colors.text_title};
      font-weight: 600;
    };

    p {
      font-size: ${theme.font.size.medium};
      color: ${theme.colors.text};
    };
  `};
`;

export const Button = styled.button`
  cursor: pointer;

  border: 0;
  outline: 0;
  background-color: transparent;

  display: flex;

  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;

  svg {
    stroke: ${({ theme }) => theme.colors.primary};
  }
`;