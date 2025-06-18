import styled, { css } from "styled-components";

export const Container = styled.section`
  position: fixed;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #3030305a;
  transition: .3s;

  z-index: 2;

  backdrop-filter : blur(15px);
`;

export const Content = styled.div`
  display: flex;
  position: relative;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 6px;

  padding: 1em 2em;

  transition: .5s;

  @media only screen and (max-width: 600px) {
    margin: 10px;
  };

  ${({ theme }) => css`
    background-color: ${theme.colors.background};
  `};
`;