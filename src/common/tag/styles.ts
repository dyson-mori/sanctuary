import styled, { css } from "styled-components";

export const Container = styled.button`
  display: flex;
  position: relative;

  justify-content: center;
  align-items: center;  

  min-width: 50px;
  height: 50px;

  cursor: pointer;

  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    border-radius: ${theme.border.small};
  `}

  p {
    position: absolute;
    top: 4px;
    right: 8px;

    color: #fff;
  }
`;

export const Title = styled.div`
  display: flex;

  width: 100%;

  justify-content: center;

  padding: 10px 0 20px 0;

  ${({ theme }) => css`
    h4 {
      color: ${theme.colors.granite_gray};
    };
  `};
`;

export const Content = styled.div`
  display: flex;

  width: 100%;

  flex-wrap: wrap;
`;