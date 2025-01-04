import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;

  transition: .5s;

  label {
    display: flex;

    justify-content: center;
    flex-direction: column;

    width: 100%;

    margin: 5px 0;
    /* padding: 10px; */

    cursor: pointer;

    background-color: #fff;

    ${({ theme }) => css`
      font-size: ${theme.font.size.medium};
      color: ${theme.colors.philippine_gray};
      
      border: 1px dashed #ddd;
      border-radius: ${theme.border.middle};
    `};
  };
`;

export const Preview = styled.div`
  position: relative;

  width: 100%;
  height: 400px;

  border-radius: 6px;
  overflow: hidden;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  };

  .preview-description {
    position: absolute;

    bottom: 0;
    width: 100%;

    padding: 10px;
  };

  .preview-description > h4 {
    margin-bottom: 10px;
    letter-spacing: 1px;

    ${({ theme }) => css`
      font-size: ${theme.font.size.medium};
      color: ${theme.colors.white};
      font-weight: ${theme.font.weight.medium};
    `};
  };

  .preview-description > p {
    ${({ theme }) => css`
      color: ${theme.colors.white};
    `};
  };
`;