import React, { useEffect, useRef } from 'react';

import { Container, Footer } from './styles';

import { PostProps } from '@global/interface';
import { Lock } from '@svg';
import { convertUrlToBlob } from '@utils';

interface Props {
  // show: boolean;
  dimension: {
    colunm: number;
    max_width: number;
    size: number;
  };
  post: PostProps;
  enabled: boolean;
  size: {
    width: number;
    height: number;
  };
  onClick?: (data: PostProps) => void;
};

export const PostVideo = ({ post, enabled, size, dimension, onClick }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(async ([entry]) => {
      if (videoRef.current) {
        videoRef.current.src = await convertUrlToBlob('https://res.cloudinary.com/dyrtdrnky/video/upload/' + post.pre_video);
      };

      if (videoRef.current && entry.isIntersecting && !!videoRef.current.src) {
        await videoRef.current.play();
      };

      if (videoRef.current && !entry.isIntersecting) {
        return videoRef.current.pause();
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: .5
    })

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    }
  }, []);

  const styles = {
    width: size.width / dimension.size,
    height: post.height / post.width * size.width / dimension.size,
    borderRadius: 6,
    cursor: enabled && !post.pre_video.includes('e_blur:800/') ? 'pointer' : 'default',
    disabled: !enabled
  };

  function handleClick() {
    if (enabled && !post.pre_video.includes('e_blur:800/')) {
      // @ts-expect-error: ignore
      onClick(post)
    }
  };

  return (
    <Container as='button' style={styles} onClick={handleClick}>
      {post.pre_video.includes('e_blur:800/') && (
        <span>
          <Lock width={25} height={25} stroke='#fff' strokeWidth={2} />
          <p>$2</p>
        </span>
      )}
      <video
        ref={videoRef}
        style={{ ...styles, filter: 'blur(0px)' }}
        preload='load'
        muted
        loop
        playsInline
        onContextMenu={e => e.preventDefault()}
        controlsList='nodownload'
      >
        <source type='video/webm' />
      </video>
      <Footer>
        <h3>{post.title.replace('_', ' ')}</h3>
      </Footer>
    </Container>
  );
};