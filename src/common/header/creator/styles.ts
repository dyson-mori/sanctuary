import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  flex-direction: column;

  width: 100%;

  height: 350px;
  overflow-y: hidden;

  h2 {
    font-size: 15px;
    color: #303030;
    margin: 5px 0;
  }
`;

export const Option = styled.button`
  display: flex;

  padding: 5px 0;

  img {
    object-fit: cover;
    border-radius: 3px;

    min-width: 50px;
  };

  span {
    margin: 0 5px;
    width: 2px;
    height: 2px;
    background-color: #000;
    border-radius: 5px;
  }

  .sides {
    display: flex;

    flex-direction: column;
    justify-content: space-evenly;

    padding: 0 10px;

    width: 100%;
    height: 100%;

    color: #303030;
  }

  .upside {
    display: flex;
    align-items: center;
    width: 100%;
  };

  .upside > p:nth-child(1) {
    font-size: 12px;
    font-weight: 500;

    font-family: var(--font-montserrat);
  };

  .upside > p:nth-child(3) {
    font-size: 11px;
    font-weight: 500;
  };

  .downside {
    display: flex;

    justify-content: space-between;
    width: 100%;
  };

  .downside > p:nth-child(1) {
    font-size: 12px;
    font-weight: 500;
    text-align: start;
  }

  .downside > p:nth-child(2) {
    font-size: 12px;
  }
`;