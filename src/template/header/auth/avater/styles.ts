import styled, { css } from "styled-components";

export const Container = styled.div`
  position: relative;

  border: 0;
  outline: 0;
  background-color: transparent;

  display: flex;

  justify-content: center;
  align-items: center;
  
  width: 50px;
  height: 50px;

  .dropdown-container {
    position: relative;
    display: flex;
    cursor: pointer;

    justify-content: center;
    align-items: center;

    width: 50px;
    height: 50px;
  }

  .dropdown-container img {
    border-radius: 50px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .dropdown-container:hover img {
    transform: scale(1.03);
  }

  .dropdown-content {
    position: absolute;
    top: 100%;
    right: 0;
    width: 200px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin-top: 5px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: all 0.25s ease;
    z-index: 10;
  };

  .dropdown-container:hover .dropdown-content {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .dropdown-content a {
    display: flex;
    color: #333;
    text-decoration: none;
    padding: 6px 0;
  }

  .dropdown-content a:hover {
    color: #0070f3;
  }

  .dropdown-content button {
    display: flex;
    color: #333;
    padding: 6px 0;
  }

  .dropdown-content button:hover {
    color: #0070f3;
  }

  ${({ theme }) => css`
    svg {
      margin-right: 5px;
      stroke: ${theme.colors.primary};
    }
  `};
`;

export const Button = styled.button`
  cursor: pointer;

  border: 0;
  outline: 0;
  background-color: transparent;

  display: flex;

  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;

  ${({ theme }) => css`
    svg {
      stroke: ${theme.colors.primary};
    };
  `}
`;
