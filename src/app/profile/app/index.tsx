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
  users: UserProps[];
  category: CategoryProps[];
};

export default function AppProfile({ user, users, category }: Props) {
  const size = useWindowSize();

  const dimension = size.width <= 600 ? 2 : 6;

  const [edited, setEdited] = useState<PostProps | undefined>(undefined);
  const [remove, setRemove] = useState<PostProps | undefined>(undefined);

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
        {Array.from({ length: dimension }).map((_, index) => (
          <section key={index}>
            {user.post.map((row, i) => i % dimension === index &&
              <Options key={i}>
                <Image
                  src={'https://res.cloudinary.com/dyrtdrnky/video/upload/' + row.pre_image}
                  width={size.width <= 600 ? size.width / 2.1 : size.width / 6.2}
                  height={row.height / row.width * (size.width <= 600 ? size.width / 2.1 : size.width / 6.2)}
                  alt={i.toString()}
                  style={{
                    borderRadius: 6
                  }}
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

      <Register post={edited} onClick={setEdited} users={users} category={category} />
      <Delete data={remove} setClose={setRemove} />

    </Container>
  )
};
