"use client";

import { useState } from "react";

import Image from "next/image";

import { Pen, Trash } from "@svg";
import { useWindowSize } from "@hooks";
import { capitalizeFirstLetter } from "@utils";
import { CategoryProps, PostProps, UserProps } from "@global/interface";

import Register from "../_components/register";
import Delete from "../_components/delete";

import { Banner, Container, Article, Options } from "./styles";

interface Props {
  user: UserProps;
  // users: UserProps[];
  category: CategoryProps[];
};

const dimension = [
  {
    max_width: 500,
    colunm: 2,
    size: 2.2
  },
  {
    max_width: 600,
    colunm: 3,
    size: 3.2
  },
  {
    max_width: 800,
    colunm: 4,
    size: 4.2
  },
  {
    max_width: 1000,
    colunm: 5,
    size: 5.2
  },
  {
    max_width: 10000,
    colunm: 6,
    size: 6.2
  }
];

export default function AppProfile({ user, category }: Props) {
  const size = useWindowSize();

  const [edited, setEdited] = useState<PostProps | undefined>(undefined);
  const [remove, setRemove] = useState<PostProps | undefined>(undefined);

  const colunm = dimension.find(el => size.width <= el.max_width)!;

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
          width={size.width}
          height={size.height / 1.1}
          src={'https://res.cloudinary.com/dyrtdrnky/image/upload/' + user.banner}
          alt="banner"
          style={{ objectFit: 'cover' }}
        />
      </Banner>

      <Article>
        {Array.from({ length: colunm.colunm }).map((_, index) => (
          <section key={index}>
            {user.post.map((row, i) => i % colunm.colunm === index &&
              <Options key={i}>
                <Image
                  src={'https://res.cloudinary.com/dyrtdrnky/video/upload/' + row.pre_image}
                  width={size.width / colunm.size}
                  height={row.height / row.width * (size.width / colunm.size)}
                  alt={i.toString()}
                  style={{ borderRadius: 6 }}
                />
                <div className="options">
                  <button onClick={() => setEdited(row)}>
                    <Pen width={25} height={25} strokeWidth={2} />
                  </button>
                  <button onClick={() => setRemove(row)}>
                    <Trash width={25} height={25} strokeWidth={2} />
                  </button>
                </div>
              </Options>
            )}
          </section>
        ))}
      </Article>

      <Register post={edited} onClick={setEdited} category={category} />
      <Delete data={remove} setClose={setRemove} />

    </Container>
  )
};
