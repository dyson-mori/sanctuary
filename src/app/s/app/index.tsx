"use client"

import React, { useState, useEffect, useRef } from 'react';

import Image from 'next/image';

import { PostProps } from '@global/interface';
// import { capitalizeFirstLetter } from '@utils';

import { About, Container, Feed, Header, Posts } from './styles';
import { TargetVideo } from '../_components/video';

interface Props {
  posts: PostProps[];
};

export default function Search({ posts }: Props) {
  const contRef = useRef<HTMLDivElement>(null);
  const postRef = useRef<HTMLElement | null>(null);

  const [count, setCount] = useState([1, posts.filter((_, i) => i !== 0).map(() => 0)]);
  console.log(count);

  const onScroll = () => {
    if (!postRef.current) return;
    const ref = postRef.current as unknown as HTMLDListElement[]

    const styles = ref.map(group => {
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
          // <Posts key={index} ref={ref => postRef.current![index] = ref}>
          <Posts key={index} ref={postRef.current![index]}>
            <TargetVideo posts={item} />
          </Posts>
        ))}
      </Feed>

      <About>
        {
          posts.map((row, index) => (
            <Header key={index}>
              <Image
                width={50}
                height={50}
                src={`https://res.cloudinary.com/dyrtdrnky/image/upload/${posts[index].url_pre_image}`}
                alt='photo'
                style={{ borderRadius: 30, objectFit: 'cover' }}
              />
              <div className='info'>
                <a>{row.id}</a>
                {/* <a href={`/creator?name=${posts[0].participant[0].name}`}>Mollyflwer</a> */}
                {/* <a href={`/creator?name=${posts[0].participant[0].name}`}>{capitalizeFirstLetter(posts[0].participant[0].name)}</a> */}
                <p>New poll available</p>
              </div>
            </Header>
          ))
        }
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
