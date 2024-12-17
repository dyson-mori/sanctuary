import styled, { css } from "styled-components";

export const NewCategory = styled.button`
  position: absolute;

  padding: 0;
  margin: 0;

  display: flex;

  justify-content: center;
  align-items: center;

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