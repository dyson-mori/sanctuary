import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;

  transition: .5s;

  /*
  .preview {
    display: flex;

    width: 100%;

    justify-content: center;
    align-items: center;
  };

  .preview > video {
    width: 100%;
    height: 300px;
    border-radius: 3px;
  };
  
  */

  .preview {
    display: flex;

    align-items: center;
  };

  .preview-description {
    padding: 0 10px;
  }

  .preview-description > h4 {
    margin-bottom: 10px;

    ${({ theme }) => css`
      font-size: ${theme.font.size.medium};
      color: ${theme.colors.dark_charcoal};
    `};
  }

  video, img {
    width: 80px;
    height: 80px;
    border-radius: 6px;
    object-fit: cover;
  };

  label {
    display: flex;

    justify-content: center;
    flex-direction: column;

    width: 100%;

    margin: 5px 0;
    padding: 10px;

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