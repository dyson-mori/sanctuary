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
  height: calc(100vh / 4);

  img {
    height: calc(100vh / 4);
  }

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

  #profile {
    position: absolute;

    bottom: -50px;
    left: 50px;

    z-index: 1;

    overflow: auto;
  }
`;

export const Article = styled.article`
  display: flex;

  justify-content: space-evenly;

  margin-top: 10px;

  section {
    display: flex;

    align-items: center;
    flex-direction: column;

    width: calc(100% / 6);
  }
`;

export const Options = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  .options {
    position: absolute;
    bottom: 0;

    width: 100%;
    display: flex;

    justify-content: space-around;

    button {
      padding: 10px;
    };

    ${({ theme }) => css`
      button > svg {
        stroke: ${theme.colors.primary};
      };

      button:nth-child(2) > svg {
        stroke: ${theme.colors.error};
      }
    `};
  };
`;