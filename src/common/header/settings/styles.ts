import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;

  width: 100%;

  a {
    text-decoration: none;
  };

  .info {
    text-align: start;
  }

  ${({ theme }) => css`
    h3 {
      color: ${theme.colors.dark_charcoal};
    };

    .description {
      color: ${theme.colors.philippine_gray};
      font-size: ${theme.font.size.medium};
      margin: 5px 0 10px 0;
    };

    .version {
      width: 100%;
      text-align: center;

      margin: 50px 0 0 0;

      p {
        color: ${theme.colors.philippine_gray};
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
      color: ${theme.colors.dark_charcoal};
      font-weight: 600;
    };

    p {
      font-size: ${theme.font.size.medium};
      color: ${theme.colors.philippine_gray};
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
`;