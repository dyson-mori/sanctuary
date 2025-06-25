import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;

  justify-content: center;

  margin-bottom: 10px;

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 10px;
    cursor: pointer;
    height: 90px;
  };

  video {
    width: 100%;
    max-height: 450px;
    object-fit: cover;
  };

  ${({ theme }) => css`
    label {
      background-color: ${theme.colors.background_modal};
      color: ${theme.colors.text};
      box-shadow: ${theme.box.shadow.input};
      border-radius: ${theme.border.small};
    };

    video {
      border-radius: ${theme.border.small};
      border: 0;
    }
  `};
`;