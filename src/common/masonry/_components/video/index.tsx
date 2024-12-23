import React, { use, useEffect, useRef } from 'react';

import { MasonryProps } from '../..';
import { Container, Footer } from './styles';
import { Lock } from '@svg';
import { convertUrlToBlob } from '@utils';

interface Props {
  show: boolean;
  post: MasonryProps & {
    nickname?: string;
  };
  size: {
    width: number;
    height: number;
  };
  navigate: (id: string) => void;
};

export const PostVideo = ({ post, show, size, navigate }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const parse = JSON.parse(post.cloudinary_video);
  // const url = use(convertUrlToBlob(parse.secure_url))

  useEffect(() => {
    const observer = new IntersectionObserver(async ([entry]) => {

      if (videoRef.current) {
        videoRef.current.src = await convertUrlToBlob(parse.secure_url);
      };

      if (videoRef.current && entry.isIntersecting && show) {
        videoRef.current.play();
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
  }, [show]);

  const styles = {
    width: size.width <= 600 ? size.width / 2.1 : size.width / 6.2,
    height: parse.height / parse.width * (size.width <= 600 ? size.width / 2.1 : size.width / 6.2),
    borderRadius: size.width <= 600 ? 12 : 6
  };

  return (
    <Container style={styles} as="button" disabled={post.hide} onClick={() => navigate(post.nickname ?? post.creator.nickname)}>
      {post.hide && (
        <span>
          <Lock width={25} height={25} stroke='#fff' strokeWidth={2} />
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
        <h3>{post.nickname?.replace('_', ' ') ?? post.title?.replace('_', ' ')}</h3>
      </Footer>
    </Container>
  );
};