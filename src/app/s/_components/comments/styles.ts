import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;

  flex-direction: column;

  height: 100%;
`;

export const Title = styled.div`
  display: flex;

  align-items: center;

  width: 100%;

  span {
    width: 100%;
    height: 1px;
    background-color: #ddd;
    margin: 0 10px;
  };

  p {
    ${({ theme }) => css`
      color: ${theme.colors.dark_charcoal};
      font-size: ${theme.font.size.medium};
      font-weight: ${theme.font.weight.regular};
    `};
  }
`;

export const Content = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: end;

  height: 100%;
`;

export const User = styled.div`
  display: flex;

  align-items: center;

  margin: 5px 10px;

  img {
    border-radius: 9px;
  };

  .info {
    width: 100%;
    padding: 0 5px;
  };

  .info > h3 {
    margin-bottom: 5px;

    ${({ theme }) => css`
      color: ${theme.colors.dark_charcoal};
      font-size: ${theme.font.size.large};
      font-weight: ${theme.font.weight.semi_bold};
    `};
  };

  .info > .row {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .info > .row > p {
    ${({ theme }) => css`
      color: ${theme.colors.dark_charcoal};
      font-size: ${theme.font.size.medium};
      font-weight: ${theme.font.weight.regular};
    `};
  };
`;