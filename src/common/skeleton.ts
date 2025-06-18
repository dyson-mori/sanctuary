import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const Skeleton = styled.div<{ $width: string, $height: string }>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border-radius: 3px;
  background: #f0f0f0;
  background-image: linear-gradient(
    90deg,
    #f0f0f0 0px,
    #dedede 40px,
    #f0f0f0 80px
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  animation: ${shimmer} 1.2s infinite linear;
`;