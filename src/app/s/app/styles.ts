import styled from "styled-components";

export const Container = styled.main`
  display: flex;

  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;

  height: 100%;
`;

export const Posts = styled.section`
  display: flex;
  position: relative;

  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  min-height: 100%;

  scroll-snap-align: start;

  z-index: 1;

  /* border: 10px solid #000; */

  video {
    width: 100%;
    height: calc(100vh / 1.03);
    border-radius: 9px;
  }
`;

export const Feed = styled.aside`
  display: flex;

  flex-direction: column;

  width: 100%;

  overflow: auto;
  scroll-snap-type: y mandatory;
`;

export const About = styled.aside`
  background-color: #f1f1f1;
  width: calc(100% / 2.5);
  /* height: 100vh; */

  z-index: 1;
`;

export const Header = styled.header`
  display: flex;

  padding: 15px;

  width: max-content;
  height: 50px;

  .info {
    display: flex;

    flex-direction: column;
    justify-content: center;

    height: 100%;

    margin: 0 15px;
  }

  a {
    color: #303030;
    font-size: 14px;
    font-weight: 600;
    font-family: var(--font-montserrat);
    text-decoration: none;
  };

  p {
    font-size: 12px;
    font-weight: 500;
    font-family: var(--font-montserrat);
    color: #707070;
    margin-bottom: 5px;
  };
`;