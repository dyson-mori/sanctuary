"use client";

import Image from "next/image";
import { Creator } from "@prisma/client";

import { PostProps } from "@global/interface";
import { useWindowSize } from "@hooks";
import { capitalizeFirstLetter } from "@utils";

import { Masonry } from "@common";
import { Onlyfans, Twitter } from "@svg";

import { Banner, Column, Container, Content, Social } from "./styles";

interface Props {
  creator: Creator;
  posts: PostProps[];
};

export default function Main({ creator, posts }: Props) {
  const { width, height } = useWindowSize();

  return (
    <Container>
      <Banner>
        <h1>{capitalizeFirstLetter(creator.name)}</h1>
        <Social>
          {
            creator.social_media?.split(", ").map(item =>
              item.startsWith('https://onlyfans') ? (
                <Onlyfans key={item} width={45} height={45} />
              ) : item.startsWith('https://x') ? (
                <Twitter key={item} width={35} height={35} />
              ) : null
            )
          }
        </Social>
        <Image
          width={width}
          height={height / 1.1}
          src={'https://res.cloudinary.com/dyrtdrnky/image/upload/' + creator.photo}
          alt="banner"
          style={{ objectFit: 'cover' }}
        />
        <span className="blur" />
      </Banner>

      {/* <Options>
        {
          creator.tags.map(tag => (
            <Button key={tag} style={{}} onClick={() => {}}>
              {tag.replace('_', ' ')}
            </Button>
          ))
        }
      </Options> */}

      <Content>
        <Masonry posts={posts} navigate={console.log} />
      </Content>

    </Container>
  )
}