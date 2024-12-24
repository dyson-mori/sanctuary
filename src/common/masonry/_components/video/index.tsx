import React, { useEffect, useRef } from 'react';

import { Container, Footer } from './styles';

import { PostProps } from '@global/interface';
import { Lock } from '@svg';
import { convertUrlToBlob } from '@utils';

interface Props {
  show: boolean;
  post: PostProps;
  size: {
    width: number;
    height: number;
  };
  navigate: (id: string) => void;
};

export const PostVideo = ({ post, show, size, navigate }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(async ([entry]) => {

      if (videoRef.current) {
        videoRef.current.src = await convertUrlToBlob('https://res.cloudinary.com/dyrtdrnky/video/upload/' + post.pre_video);
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
    height: post.height / post.width * (size.width <= 600 ? size.width / 2.1 : size.width / 6.2),
    borderRadius: size.width <= 600 ? 12 : 6
  };

  return (
    <Container style={styles} disabled={!!post.hide} onClick={() => navigate('any')}>
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
        <h3>{post.title.replace('_', ' ')}</h3>
      </Footer>
    </Container>
  );
};