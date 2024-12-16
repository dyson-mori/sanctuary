import styled, { css } from "styled-components";

export const Container = styled.main`
  display: flex;

  flex-direction: column;

  overflow-y: auto;
`;

export const Banner = styled.section`
  position: relative;
  display: flex;

  justify-content: center;
  align-items: center;

  width: 100%;
  height: calc(100vh / 1.1);

  background-color: #ddd;

  ${({ theme }) => css`
    box-shadow: ${theme.box.shadow.banner};
  `};

  h1 {
    position: absolute;
    z-index: 1;
    font-size: 60px;
    font-family: var(--font-my-soul);
    color: #fff;
    font-weight: 500;
    letter-spacing: 3px;
  }

  .blur {
    position: absolute;
    width: 100%;
    height: 100%;;
    backdrop-filter: blur(10px);
  };
`;

export const Options = styled.div`
  display: flex;

  justify-content: center;

  width: 100%;

  margin: 10px 0px;
`;

export const Button = styled.button`
  border: 0;
  outline: 0;

  display: flex;

  justify-content: center;
  align-items: center;

  border-radius: 3px;

  min-width: 50px;

  padding: 0px 10px;
  margin: 0 5px;
  height: 35px;

  ${({ theme, disabled }) => css`
    background-color: ${theme.colors.white};
    box-shadow: ${theme.box.shadow.header};

    cursor: ${disabled ? 'default' : 'pointer'};
  `};

  color: #707070;

  font-size: 15px;
  font-weight: 500;

  font-family: var(--font-montserrat), sans-serif;
`;

export const Content = styled.section`
  display: flex;

  justify-content: space-evenly;

  width: 100%;
  min-height: 50vh;

  margin-top: 10px;
`;

export const Column = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;

  width: calc(100% / 6);
`;

export const Social = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100px;

  position: absolute;
  bottom: 0;

  z-index: 2;

  svg {
    margin: 5px;
  }
`;