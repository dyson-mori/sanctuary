import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

export const Card = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  padding: 0 10px;
  margin: 5px 0;

  width: 100%;
  height: 70px;

  ${({ theme }) => css`
    box-shadow: ${theme.box.shadow.default};
    border-radius: ${theme.border.small};
  `};
`;