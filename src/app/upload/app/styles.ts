import styled, { css } from "styled-components";

export const Container = styled.main`
  display: flex;

  align-items: center;
  justify-content: center;
  flex-direction: column;

  gap: 5rem;

  height: 100%;
`;

export const Content = styled.div`
  display: flex;

  align-items: center;

  width: 35%;
  height: 90px;
  padding: 5px 10px;

  border-radius: 9px;

  .title {
    display: flex;

    justify-content: space-between;
    width: 100%;

    margin-bottom: 10px;
  };

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 10px;
    cursor: pointer;
  };

  ${({ theme }) => css`
    background-color: ${theme.colors.background_modal};
    color: ${theme.colors.text};
  `};
`;

export const SubContent = styled.div`
  width: 100%;
`;