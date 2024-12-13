import styled from "styled-components";

export const Container = styled.section`
  position: absolute;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #3030305a;
  transition: .3s;

  z-index: 1;

  backdrop-filter : blur(15px);
`;

export const Content = styled.div`
  display: flex;
  position: relative;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 500px;
  min-height: 100px;

  border-radius: 6px;
  background: #fff;

  padding: 1em 2em;

  transition: .5s;
`;