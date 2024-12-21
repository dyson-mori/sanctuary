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

  padding: 20px;

  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    border-radius: ${theme.border.small};
    box-shadow: ${theme.box.shadow.modal};
  `};
`;