import { createGlobalStyle, css } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: var(--font-montserrat);
  };

  html, body {
    width: 100%;
    height: 100vh;

    ${({ theme }) => css`
      background-color: ${theme.colors.background};
    `};
  };

  p, h1, h2, h3, h4, input, label, button {
    font-family: var(--font-montserrat-alternates), sans-serif;
  };

  button {
    border: 0;
    outline: 0;
    cursor: pointer;
    background-color: transparent;
  };

  input[type="file"] {
    display: none;
  }

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