import styled, { css } from "styled-components";

export const Container = styled.form`
  display: flex;

  height: 100%;

  justify-content: center;
  align-items: center;
  flex-direction: column;

  #logo {
    margin: 15px 0;
    ${({ theme }) => css`
      stroke: ${theme.colors.primary};
    `}
  }

  #container-input {
    margin: 5px 0;
  }
`;
