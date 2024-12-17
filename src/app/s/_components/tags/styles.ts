import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;

  margin: 25px 5px;

  .box {
    padding: 5px;
  };

  .box > p {
    ${({ theme }) => css`
      color: ${theme.colors.dark_charcoal};
      font-size: ${theme.font.size.medium};
      font-weight: ${theme.font.weight.regular};
    `};
  };
`;