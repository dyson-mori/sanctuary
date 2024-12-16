"use client"

import React, { useState, useEffect, useRef } from 'react';

import { PostProps } from '@global/interface';

import { TargetVideo } from '../_components/video';
import { HeaderAside } from '../_components/header';

import { About, Container, Feed, Posts } from './styles';

interface Props {
  posts: PostProps[];
};

export default function Search({ posts }: Props) {
  const contRef = useRef<HTMLDivElement>(null);
  const postRef = useRef<HTMLElement[]>([]);

  const [count, setCount] = useState([1, posts.filter((_, i) => i !== 0).map(() => 0)]);

  const onScroll = () => {
    if (!postRef.current) return;

    const styles = postRef.current.map(group => {
      const { y } = group.getBoundingClientRect();
      const rectY = y / window.innerHeight + 1;

      if (rectY >= 1 && rectY <= 2) return Math.abs(rectY - 2)

      if (rectY <= 0 || rectY >= 2) return 0;

      return rectY;
    });

    setCount(styles);
  };

  useEffect(() => contRef.current?.addEventListener('scroll', onScroll), []);

  return (
    <Container>
      <Feed ref={contRef}>
        {posts.map((item, index) => (
          <Posts key={index} ref={postRef.current[index] as any}>
            <TargetVideo posts={item} />
          </Posts>
        ))}
      </Feed>

      <About>
        <HeaderAside posts={posts} />
      </About>

      {/* tentar fazer isso dentro do componente video
      {posts.map((item, index) => (
        <Image
          style={{
            position: 'fixed',
            objectFit: 'cover',
            filter: 'blur(10px)',
            opacity: count[index ?? 0],
            transition: '.1s',
            width: window.innerWidth,
            height: window.innerHeight
          }}
          key={index}
          src={`https://res.cloudinary.com/dyrtdrnky/video/upload/${item.url_pre_image}`}
          width={50}
          height={50}
          alt={'item.creator.name'}
        />
      ))} */}

    </Container>
  );
};
