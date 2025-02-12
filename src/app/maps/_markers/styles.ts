import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  display: flex;

  justify-content: center;

  margin-bottom: 10px;

  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  border-radius: 6px;

  span {
    position: absolute;

    width: 40px;
    height: 40px;

    background-color: #f1f1f1;

    border-radius: 3px;

    bottom: -5px;

    transform: rotate(45deg);
  };
`;