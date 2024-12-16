import styled from "styled-components";

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