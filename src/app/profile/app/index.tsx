"use client";

import { useState } from "react";

import Image from "next/image";

import { CategoryProps, PostProps, UserProps } from "@global/interface";
import { useWindowSize } from "@hooks";
import { capitalizeFirstLetter } from "@utils";
import { Masonry } from "@common";

import Register from "../_components/register";

import { Banner, Container, Article, Content } from "./styles";

interface Props {
  user: UserProps;
  users: UserProps[];
  category: CategoryProps[];
};

export default function AppProfile({ user, users, category }: Props) {
  const { width, height } = useWindowSize();

  const [post, setPost] = useState({} as PostProps | undefined);

  return (
    <Container>
      <Banner>
        <h1>{capitalizeFirstLetter(user?.nickname)}</h1>
        {/* <Image
          id="profile"
          width={100}
          height={100}
          src={'https://res.cloudinary.com/dyrtdrnky/image/upload/' + user.photo}
          alt='user'
          style={{ objectFit: 'cover', borderRadius: 200 }}
        /> */}

        <span className="blur" />

        <Image
          width={width}
          height={height / 1.1}
          src='https://res.cloudinary.com/dyrtdrnky/image/upload/v1734817726/community/creator/banners/c4b31d1f1e2631d4c89a28318d3c1046_udc8in.jpg'
          alt="banner"
          style={{ objectFit: 'cover' }}
        />
      </Banner>

      <Article>
        <Content>

          {/* <Options></Options> */}

          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Masonry posts={user.post} onClick={setPost} />
          </div>
        </Content>
      </Article>

      <Register post={post} users={users} category={category} />

    </Container>
  )
};
