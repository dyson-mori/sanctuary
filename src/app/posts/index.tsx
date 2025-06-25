"use client";

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { Lock } from '@svg';

import { Button, Masonry, Modal } from '@common';
import { PostProps } from '@global/interface';
import { usePlay } from '@context/autoPlayContext';
import { serverActionCookie } from '@utils/actions';

import { Container } from './styles';

interface Props {
  posts: PostProps[];
};

export default function Post({ posts }: Props) {
  const { autoPlay } = usePlay();
  const route = useRouter();

  const [payment, setPayment] = useState<PostProps | undefined>(undefined);

  function navigate(post: PostProps) {
    if (post.isPrivate) return setPayment(post);
    return route.push(`/feed?id=${post.id}`);
  };

  // const handleMore = async () => {
  //   const testing = await axios.post(`http://localhost:3000/api/page?page=${2}`, {
  //     adapter: "fetch",
  //     fetchOptions: {
  //       cache: "force-cache"
  //     },
  //     withCredentials: true,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       /* @ts-ignore */
  //       // Cookie: cookies(),
  //     }
  //   });

  //   setData(prev => [...prev, ...testing.data]);
  // };



  return (
    <Container>
      <Masonry autoPlay={autoPlay} posts={posts} onClick={navigate} />

      <Modal open={!!payment} onClickOutside={() => setPayment(undefined)}>
        <Lock width={30} height={30} stroke="#6A42C2" strokeWidth={1.5} />
        {payment ? (
          <video
            style={{ borderRadius: 6, margin: 10 }}
            // width='40%'
            height={300}
            preload='load'
            muted
            loop
            playsInline
            onContextMenu={e => e.preventDefault()}
            controlsList='nodownload'
          >
            <source src={payment?.preview} type='video/mp4' />
          </video>
        ) : null}

        <p>O criador privou esse conteúdo, para assistir basta pagar R$ {payment?.price},00.</p>
        <p>Pagando você terá acesso a mais conteúdo postados por user</p>

        <div style={{ height: 10 }} />

        <Button>Pagar</Button>
      </Modal>
    </Container >
  );
};

// fazer um loading individual para cada imagem