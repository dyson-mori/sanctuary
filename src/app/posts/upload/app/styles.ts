import styled, { css } from "styled-components";

export const Container = styled.form`
  display: flex;

  justify-content: center;
  align-items: center;

  height: 100%;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    height: 100%;
  };
`;

export const Upload = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 50%;
  height: 100%;

  overflow: hidden;

  margin: 0 0 5px 0;
  padding: 20px 40px;

  @media only screen and (max-width: 600px) {
    width: 70%;
    padding: 0px 40px;
    height: auto;
  };

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
      border-radius: ${theme.border.small};
    `};
  };
`;

export const RightSide = styled.section`
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: calc(100% / 3);
  height: 100%;
  padding: 0 100px;

  @media only screen and (max-width: 600px) {
    width: 92%;
    height: auto;
  };
`;

export const Div = styled.div`
  display: flex;

  width: 100%;
`;