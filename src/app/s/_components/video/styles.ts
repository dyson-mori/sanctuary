import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  position: relative;

  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  min-height: 100vh;

  scroll-snap-align: start;

  video {
    /* width: calc(100% / 1.01); */
    height: calc(100% / 1.01);
    border-radius: 9px;
    z-index: 1;
  };
`;

export const Controller = styled.div`
  position: absolute;
  display: flex;

  align-items: center;

  bottom: 0;

  width: 370px;
  height: 50px;

  background-color: #0000001a;

  border-radius: 9px;

  z-index: 1;

  /* bottom: 10px; */
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