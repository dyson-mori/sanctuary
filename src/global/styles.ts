import { createGlobalStyle, css } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  };

  html, body {
    width: 100%;
    height: 100vh;

    ${({ theme }) => css`
      background-color: ${theme.colors.background};
    `};
  };

  p, h3 {
    font-family: var(--font-montserrat-alternates), sans-serif;
  };

  /* width */
  ::-webkit-scrollbar {
    width: 1px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    ${({ theme }) => css`
      background-color: ${theme.colors.background};
    `};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    ${({ theme }) => css`
      background-color: ${theme.colors.background};
    `};
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;