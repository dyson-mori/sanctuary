import styled from "styled-components";

export const Container = styled.main`
  display: flex;

  justify-content: center;
  align-items: center;

  width: 100%;
  height: 90%;
`;

export const Card = styled.div`
  display: flex;

  svg {
    position: absolute;

    top: 30%;
    left: 50%;

    transform: translate(-50%, -50%);
  };

  h3 {
    position: absolute;

    top: 38%;
    left: 50%;

    transform: translate(-50%, -50%);

    letter-spacing: 1.5px;

    color: #fff;
  }
`;
