import styled from "styled-components";

export const Container = styled.span`
  position: absolute;
  width: 100%;

  top: 0;
  bottom: 0;

  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  backdrop-filter: blur(10px);

  z-index: 1;

  p {
    margin-top: 5px;
    font-size: 15px;
    font-weight: 500;
    color: #fff;
  };
`;

export const ButtonCard = styled.button`
  position: absolute;
  width: 100%;

  top: 0;
  bottom: 0;

  z-index: 1;
`;