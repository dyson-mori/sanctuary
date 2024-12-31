"use client"

import React, { useRef } from 'react';

import { PostProps } from '@global/interface';

import TargetVideo from '../_components/video';
// import { HeaderAside } from '../_components/header';

import { Container, Feed } from './styles';
// import { SectionTag } from '../_components/tags';
// import { Comments } from '../_components/comments';

interface Props {
  posts: PostProps[];
};

export default function Search({ posts }: Props) {
  const contRef = useRef<HTMLDivElement>(null);
  const postRef = useRef<HTMLElement[]>([]);

  // const [count, setCount] = useState([1, ...posts.filter((_, i) => i !== 0).map(() => 0)]);
  // console.log(count);

  // const onScroll = () => {
  //   if (!postRef.current) return;

  //   const styles = postRef.current.map(group => {
  //     const { y } = group.getBoundingClientRect();
  //     const rectY = y / window.innerHeight + 1;

  //     if (rectY >= 1 && rectY <= 2) return Math.abs(rectY - 2)

  //     if (rectY <= 0 || rectY >= 2) return 0;

  //     return rectY;
  //   });

  //   setCount(styles);
  // };

  // useEffect(() => contRef.current?.addEventListener('scroll', onScroll), []);

  return (
    <Container>
      <Feed ref={contRef}>
        {posts.map((item, index) =>
          <TargetVideo
            posts={item}
            // @ts-expect-error: ksoa
            ref={ref => postRef.current[index] = ref}
            key={index}
          />
        )}
      </Feed>

      {/* <About>
        <HeaderAside posts={posts} />
        <SectionTag tags={posts[0].categories} />
        <Comments comments={[]} />
      </About> */}

    </Container>
  );
};
