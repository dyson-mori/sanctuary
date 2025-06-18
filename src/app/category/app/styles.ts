import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  width: auto;
  height: 100%;
`;

export const ContainerInput = styled.section`
  display: flex;
  justify-content: center;

  padding: 20px 0px;

  div {
    width: 400px;
  }
`;

export const Content = styled.section`
  display: flex;

  justify-content: center;

  height: 100%;

  padding: 0px 25px;

  div {
    display: flex;
    flex-wrap: wrap;
    height: 0;
  };
`;

export const Footer = styled.footer`
  position: sticky;

  bottom: 0;

  display: flex;

  justify-content: center;
  align-items: center;

  width: 100%;

  padding: 20px 0;

  backdrop-filter : blur(1px);
`;
