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

  width: 100%;
  min-height: 50vh;

  margin-top: 10px;
`;

export const Content = styled.section`
  display: flex;

  width: 100%;

  flex-direction: column;
`;

export const Options = styled.div`
  display: flex;

  justify-content: center;

  width: 100%;

  margin: 10px 0px;
`;

// import Link from "next/link";

// import styled, { css } from "styled-components";

// export const Container = styled.main`
//   display: flex;
// `;

export const Upload = styled.button`
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