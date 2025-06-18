import styled, { css } from "styled-components";

export const Container = styled.aside`
  display: flex;

  flex-direction: column;
  // reajustar a posição, no momento é apenas testes

  position: fixed;

  right: 50px;
  top: 50%;
  transform: translateY(-50%);

  width: calc(100% / 3);
  height: 80%;

  overflow: hidden;

  ${({ theme }) => css`
    border-radius: ${theme.border.large};
    box-shadow: ${theme.box.shadow.modal};

    background-color: #fff;
    /* background-color: ${theme.colors.background}; */

    svg {
      stroke: ${theme.colors.primary};
    }
  `};

  .tags {
    color: #555;
    margin: 16px;
    /* margin: 16px; */
  }

  .tags span {
    margin-right: 10px;
    color: #999;
    font-size: 14px;
  }

  .comment {
    display: flex;
    gap: 10px;
    margin: 16px;
  }

  .content > p {
    font-size: 14px
  }

  .avatar {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }

  .content {
    /* background: #f5f5f5; */
    /* padding: 10px; */
    border-radius: 8px;
    width: 100%;
  }

  .name-time {
    font-size: 13px;
    color: #888;
    margin-bottom: 4px;
  }

  .reply {
    margin-left: 50px;
  }
`;

export const Header = styled.header`
  display: flex;

  justify-content: space-between;
  align-items: center;

  width: 100%;

  h3 {
    margin-left: 20px;
  }

  button {
    padding: 15px;
  };
`;

export const Content = styled.section`
  height: 100%;
`;

export const UserComment = styled.div`
  display: flex;

  img {
    margin: 0 10px;
  };

  .olks {
    display: flex;

    /* background-color: #ddd; */

    align-items: center;
  };

  .olks > h3 {
    padding: 0;
    margin: 0;
    font-size: 15px;
    margin-right: 5px;
  };

  .olks > p {
    padding: 0;
    margin: 0;
    font-size: 12px;
  };
`;

export const ButtonComment = styled.button`
  position: fixed;

  right: 50px;
  top: 50%;
  transform: translateY(-50%);

  width: 50px;
  height: 50px;

  background-color: #fff;

  ${({ theme }) => css`
    border-radius: ${theme.border.small};
    box-shadow: ${theme.box.shadow.modal};

    svg {
      fill: ${theme.colors.primary};
    }
  `};
`;