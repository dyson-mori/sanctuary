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

export const Header = styled.div`
  display: flex;
  align-items: center;

  width: 100%;

  margin-bottom: 20px;

  ${({ theme }) => css`
    > svg {
      stroke: ${theme.colors.primary}
    };

    p {
      color: ${theme.colors.philippine_gray};
      font-size: ${theme.font.size.large};
    }

    > .label {
      padding: 0 15px;

      > h4 {
        font-weight: 600;
        margin-bottom: 5px;
      }
    }
  `};
`;

export const Div = styled.div`
  display: flex;

  width: 100%;
`;