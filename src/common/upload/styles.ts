import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  position: absolute;

  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 50%;
  /* height: 100%; */

  overflow: hidden;

  padding: 20px 40px;

  transition: .5s;

  label {
    display: flex;

    justify-content: center;
    align-items: center;

    width: 400px;
    height: 400px;

    cursor: pointer;

    background-color: #fff;

    ${({ theme }) => css`
      box-shadow: ${theme.box.shadow.default};
      border-radius: ${theme.border.middle};
    `};
  };
`;