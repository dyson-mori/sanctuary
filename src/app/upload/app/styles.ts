import styled, { css } from "styled-components";

export const Container = styled.main`
  display: flex;

  align-items: center;
  justify-content: center;
  flex-direction: column;

  /* gap: 5rem; */

  height: 100%;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 500px;
  margin-bottom: 10px;
`;

export const UploadStyled = styled.div`
  display: flex;

  align-items: center;

  height: 90px;
  padding: 5px 10px;

  ${({ theme }) => css`
    box-shadow: ${theme.box.shadow.input};
    border-radius: ${theme.border.small};
  `};

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

export const Categories = styled.section`
  display: flex;

  justify-content: center;

  height: auto;

  div {
    display: flex;
    flex-wrap: wrap;
    height: auto;
  };
`;