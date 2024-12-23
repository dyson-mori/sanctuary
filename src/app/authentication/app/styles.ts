import styled, { css } from "styled-components";

export const Container = styled.main`
  display: flex;

  justify-content: center;
  align-items: center;

  height: 100%;
`;

export const Form = styled.form`
  display: flex;

  align-items: center;
  flex-direction: column;

  padding: 50px 20px;

  
  ${({ theme }) => css`
    #logo {
      stroke: ${theme.colors.primary};
    };

    background-color: ${theme.colors.white};
    border-radius: ${theme.border.small};
    box-shadow: ${theme.box.shadow.modal};

    a, p {
      font-size: ${theme.font.size.medium};
      color: ${theme.colors.philippine_gray};
      text-decoration: none;
    };
  `};

  .with {
    display: flex;

    align-items: center;

    justify-content: space-between;
    width: 100%;
  };

  .with > p {
    min-width: 68px;
    margin: 10px;
  }

  .with > span {
    width: 100%;
    height: 1px;

    background-color: #f1f1f1;
  }
`;