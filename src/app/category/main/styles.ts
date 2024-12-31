import styled from "styled-components";

export const Container = styled.main`
  display: flex;

  justify-content: center;
  flex-direction: column;

  width: auto;
`;

export const Content = styled.section`
  display: flex;

  flex-wrap: wrap;

  width: 100%;
  height: 100%;
`;

export const Footer = styled.footer`
  position: sticky;

  bottom: 0;

  /* height: 70px; */

  display: flex;

  justify-content: center;
  align-items: center;

  width: 100%;

  backdrop-filter : blur(1px);
`;
