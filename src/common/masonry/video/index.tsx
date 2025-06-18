import React, { forwardRef, ReactNode } from 'react';

import { PostProps } from '@global/interface';

import { Container } from './styles';

interface Props {
  post: PostProps;
  locked: ReactNode;
  clickable: ReactNode;
  size: {
    width: number;
    height: number;
  };
  quantity: number;
};

const Video = forwardRef<HTMLVideoElement, Props>(({ post, locked, clickable, size, quantity, ...rest }, ref) => {
  const styles = {
    width: size.width / (quantity + 0.1),
    height: post.height / post.width * (size.width / (quantity + 0.1)),
    borderRadius: 6,
  };

  // const preview_validate = ``;

  return (
    <Container style={styles}>
      {locked}
      {clickable}
      <video
        ref={ref}
        style={{ ...styles }}
        preload='metadata'
        muted
        loop
        playsInline
        onContextMenu={e => e.preventDefault()}
        controlsList='nodownload'
        {...rest}
      >
        {/* <source src={post.preview} type='video/webm' /> */}
        <source src={post.preview} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </Container>
  );
});

Video.displayName = "Video"

export default Video;