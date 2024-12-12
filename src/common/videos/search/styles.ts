import styled, { css } from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;

  align-items: center;

  border: 0;
  background-color: transparent;

  overflow: hidden;
`;

export const Controller = styled.div`
  position: absolute;
  display: flex;

  align-items: center;

  bottom: 0;

  width: 100%;
  height: 50px;

  background-color: #0000001a;

  bottom: 13px;
`;

export const Timeline = styled.div`
  width: 100%;

  height: 7px;
  margin-inline: .5rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  .timeline {
    background-color: rgba(100, 100, 100, .5);
    height: 3px;
    width: 100%;
    position: relative  
  };

  .timeline:hover {
    height: 6px;
  }
  
  .timeline::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: calc(100% - var(--preview-position) * 100%);
    background-color: rgb(150, 150, 150);
    display: none;
  }

  .timeline::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: calc(100% - var(--progress-position) * 100%);

    ${({ theme }) => css`
      background-color: ${theme.colors.primary};
    `};
  };

  .timeline .thumb-indicator {
    --scale: 0;
    position: absolute;
    transform: translateX(-50%) scale(var(--scale));
    height: 200%;
    top: -50%;
    left: calc(var(--progress-position) * 100%);
    border-radius: 50%;
    transition: transform 150ms ease-in-out;
    aspect-ratio: 1 / 1;

    ${({ theme }) => css`
      background-color: ${theme.colors.primary};
    `};
  };

  :hover .thumb-indicator {
    --scale: 1;
  }
`;