import styled, { css } from "styled-components";

import Link from "next/link";

import { Logo } from "@svg";

export const Container = styled.header`
  display: flex;
  align-items: center;

  height: 50px;

  padding: 0 25px;

  z-index: 5;

  ${({ theme }) => css`
    background-color: ${theme.header.background};
    box-shadow: ${theme.header.box_shadow};
  `};

  @media only screen and (max-width: 600px) {
    padding: 0 10px;
  };
`;

export const LogoSvg = styled(Logo)`
  width: 30px;
  height: 30px;
  stroke-width: 15px;
  stroke: ${({ theme }) => theme.colors.primary};
`;

export const Navigations = styled.nav`
  display: flex;

  align-items: center;

  height: 50px;

  width: 100%;

  padding: 0 25px;
`;

export const Li = styled(Link) <{ $selected: boolean }>`
  padding: 10px;
  font-size: 13px;
  text-decoration: none;

  @media only screen and (max-width: 600px) {
    a {
      padding: 10px 5px;
    }
  };

  ${({ theme, $selected }) => css`
    color: ${theme.colors.text};
    font-weight: 500;

    ${$selected && css`
      color: ${theme.colors.primary};
      font-weight: 600;
    `};
  `};
`;