import styled from "styled-components";

export const Column = styled.section`
  display: flex;

  align-items: center;
  flex-direction: column;

  width: calc(100% / 6);

  @media only screen and (max-width: 600px) {
    width: 100%;
  };
`;
