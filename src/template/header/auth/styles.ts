import Link from "next/link";
import styled, { css } from "styled-components";

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

export const ButtonLink = styled(Link)`
  cursor: pointer;

  border: 0;
  outline: 0;
  background-color: transparent;

  display: flex;

  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;
`;