import styled, { css } from "styled-components";

export const Container = styled.main`
  display: flex;

  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: 90%;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 450px;
  margin-bottom: 10px;

  .row {
    display: flex;
    gap: 10px;
  };
`;

export const Progress = styled.div`
  display: flex;
  width: 100%;
  height: 3px;

  background-color: #d9d9d9;
  border-radius: 9px;

  margin-bottom: 10px;

  span {
    height: 100%;
    background-color: ${({ theme }) => theme.colors.success};
  }
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

export const ButtonTag = styled.button`
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