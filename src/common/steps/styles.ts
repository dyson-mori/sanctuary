import styled, { css } from "styled-components";

export const Container = styled.section`
display: flex;

align-items: center;
`;

export const Input = styled.input`
  border: 0;
  outline: 0;

  padding: 5px 10px;

  background-color: #dedede;

  width: 300px;
  height: 50px;

  text-align: center;

  ${({ theme }) => css`
    font-weight: ${theme.typography.weight[600]};
    color: ${theme.colors.text};
  `};
`;

export const Pulse = styled.div<{ background: 'active' | 'completed' | 'deactivate' }>`
  position: relative;
  display: flex;

  justify-content: center;
  align-items: center;

	border-radius: 50px;

  margin: 25px 0;

  ${({ background }) => background === 'active' && css`
    animation: pulse 2s infinite;
    ${({ theme }) => css`
      box-shadow: 0 0 0 0 ${theme.colors.primary};
    `}
  `};

  svg {
    width: 20px;
    height: 20px;
  };

  @keyframes pulse {
    0% {
      /* transform: scale(0.95); */
      box-shadow: 0 0 0 0 #3448c5aa;
      background-color: #3448c5aa;
    };

    50% {
      /* transform: scale(1.2); */
      ${({ theme }) => css`
        box-shadow: 0 0 0 10px ${theme.colors.background};
        background-color: ${theme.colors.background};
      `}
    }

    100% {
      /* transform: scale(0.95); */
      ${({ theme }) => css`
        box-shadow: 0 0 0 0 ${theme.colors.background};
        background-color: ${theme.colors.background};
      `}
    }
  }
`;

export const Progress = styled.span<{ progress: string }>`
  position: relative;
  height: 2px;
  width: 200px;
  border-radius: 3px;

  margin: 0 10px;

  ${({ theme }) => css`
    background-color: ${theme.colors.text}1a;
  `};

  span { 
    position:absolute;
    top:0;
    /* right:100%; */
    bottom:0;
    left:0;
    transition: .5s;
  };
  
  ${({ theme, progress }) => css`
    span {
      width: ${progress === 'true' ? '100%' : 0};
      background-color: ${theme.colors.primary};
    };
  `};
`;