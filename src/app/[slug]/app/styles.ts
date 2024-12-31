import styled from "styled-components";

export const Container = styled.main`
  display: flex;

  width: 100%;
  height: 100%;
`;

export const Feed = styled.article`
  display: flex;

  flex-direction: column;
  width: 100%;
  height: 100vh;

  overflow-y: auto;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
`;

export const About = styled.aside`
  display: flex;
  flex-direction: column;

  position: sticky;
  top: 0px;

  height: 100vh;

  background-color: #f1f1f1;
  width: calc(100% / 2.5);

  @media only screen and (max-width: 600px) {
    display: none;
  };
`;