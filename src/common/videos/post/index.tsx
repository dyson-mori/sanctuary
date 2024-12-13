import React, { useEffect, useRef } from 'react';

import { PostProps } from '@global/interface';

import { Container, Footer } from './styles';

interface Props {
  post: PostProps;
  size: {
    width: number;
    height: number;
  };
  navigate: (id: string) => void;
};

export const PostVideo = ({ post, size, navigate }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (videoRef.current && entry.isIntersecting) {
        return videoRef.current.play();
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
    width: size.width <= 600 ? size.width / 2.1 : size.width / 6.2,
    height: post.height / post.width * (size.width <= 600 ? size.width / 2.1 : size.width / 6.2),
    borderRadius: size.width <= 600 ? 12 : 6
  };

  return (
    <Container style={styles} as="button" onClick={() => navigate(post.id)}>
      <video ref={videoRef} style={{ ...styles, filter: 'blur(0px)' }} preload='load' muted loop playsInline>
        <source src={'https://res.cloudinary.com/dyrtdrnky/video/upload/' + post.url_pre_video} type='video/webm' />
      </video>
      <Footer>
        {/* <h3>{post?.participant.find(row => row.name)?.name ?? ''}</h3> */}
      </Footer>
    </Container>
  );
};