import styled, { css } from "styled-components";

export const Container = styled.div`
  .checkbox-wrapper-6 .tgl {
    display: none;
  }
  .checkbox-wrapper-6 .tgl,
  .checkbox-wrapper-6 .tgl:after,
  .checkbox-wrapper-6 .tgl:before,
  .checkbox-wrapper-6 .tgl *,
  .checkbox-wrapper-6 .tgl *:after,
  .checkbox-wrapper-6 .tgl *:before,
  .checkbox-wrapper-6 .tgl + .tgl-btn {
    box-sizing: border-box;
  }
  .checkbox-wrapper-6 .tgl::-moz-selection,
  .checkbox-wrapper-6 .tgl:after::-moz-selection,
  .checkbox-wrapper-6 .tgl:before::-moz-selection,
  .checkbox-wrapper-6 .tgl *::-moz-selection,
  .checkbox-wrapper-6 .tgl *:after::-moz-selection,
  .checkbox-wrapper-6 .tgl *:before::-moz-selection,
  .checkbox-wrapper-6 .tgl + .tgl-btn::-moz-selection,
  .checkbox-wrapper-6 .tgl::selection,
  .checkbox-wrapper-6 .tgl:after::selection,
  .checkbox-wrapper-6 .tgl:before::selection,
  .checkbox-wrapper-6 .tgl *::selection,
  .checkbox-wrapper-6 .tgl *:after::selection,
  .checkbox-wrapper-6 .tgl *:before::selection,
  .checkbox-wrapper-6 .tgl + .tgl-btn::selection {
    background: none;
  }
  .checkbox-wrapper-6 .tgl + .tgl-btn {
    outline: 0;
    display: block;
    width: 3em;
    height: 1.6em;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
  }
  .checkbox-wrapper-6 .tgl + .tgl-btn:after,
  .checkbox-wrapper-6 .tgl + .tgl-btn:before {
    position: relative;
    display: block;
    content: "";
    width: 50%;
    height: 100%;
  }
  .checkbox-wrapper-6 .tgl + .tgl-btn:after {
    left: 0;
  }
  .checkbox-wrapper-6 .tgl + .tgl-btn:before {
    display: none;
  }
  .checkbox-wrapper-6 .tgl:checked + .tgl-btn:after {
    left: 50%;
  }

  .checkbox-wrapper-6 .tgl-light + .tgl-btn {
    background: #f0f0f0;
    border-radius: 2em;
    padding: 2px;
    transition: all 0.4s ease;
  }
  .checkbox-wrapper-6 .tgl-light + .tgl-btn:after {
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    transition: all 0.2s ease;
  }
  .checkbox-wrapper-6 .tgl-light:checked + .tgl-btn {
    ${({ theme }) => css`
      background-color: ${theme.colors.primary}2a;
    `};
  }
`;