import styled, { css } from "styled-components";

export const Container = styled.main`
  display: flex;

  justify-content: space-evenly;

  width: 100%;

  margin: 5px 0;

  div {
    width: 100%;
    height: 50px;

    background-color: #ddd;
  }
`;

export const Upload = styled.button`
  position: absolute;

  bottom: 20px;
  right: 20px;

  width: 50px;
  height: 50px;
  border-radius: 50px;

  ${({ theme }) => css`
    box-shadow: ${theme.box.shadow.default};
    background-color: ${theme.colors.primary};
  `};
`;