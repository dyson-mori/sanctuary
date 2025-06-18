import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  display: flex;

  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;

  overflow: hidden;

  video {
    width: 97%;
    height: 95%;
    border-radius: 3px;
  };
`;

export const Footer = styled.footer`
  position: absolute;

  display: flex;

  justify-content: center;
  align-items: center;

  width: 100%;
  height: 50px;

  bottom: 0;

  background: rgb(48,48,48);
  background: linear-gradient(0deg, rgba(0,0,0,.8) 0%, rgba(255,255,255,0) 100%);

  border-radius: 6px;

  h3 {
    font-size: 14px;
    font-weight: 400;
    color: white;
  }
`;