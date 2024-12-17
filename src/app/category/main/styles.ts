import styled, { css } from "styled-components";

export const Container = styled.main`
  display: flex;

  justify-content: center;
  flex-wrap: wrap;

  width: 100%;

  padding: 5px 0;
`;

export const Footer = styled.footer`
  position: sticky;

  bottom: 0;

  height: 70px;

  display: flex;

  justify-content: center;
  align-items: center;

  width: 100%;

  background-color: #ffffff1a;

  backdrop-filter : blur(1px);
`;
