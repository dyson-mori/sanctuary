"use client";

import { useState } from "react";

import Image from "next/image";

import { CategoryProps, PostProps, UserProps } from "@global/interface";
import { useWindowSize } from "@hooks";
import { capitalizeFirstLetter } from "@utils";

import Register from "../_components/register";

import { Banner, Container, Article, Options } from "./styles";
import Delete from "../_components/delete";

interface Props {
  user: UserProps;
  users: UserProps[];
  category: CategoryProps[];
};

export default function AppProfile({ user, users, category }: Props) {
  const size = useWindowSize();

  const dimension = size.width <= 600 ? 2 : 6;

  const [post, setPost] = useState({
    post: {} as PostProps | undefined,
    modal: false as boolean
  });

  const [remove, setRemove] = useState(undefined as PostProps | undefined);

  function handleModalWithData(modal: boolean, post: PostProps | undefined) {
    setPost({ modal, post })
    // setData(post);
  };

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
                  <button onClick={() => handleModalWithData(true, row)}>Edit</button>
                  <button onClick={() => setRemove(row)}>Delete</button>
                </div>
              </Options>
            )}
          </section>
        ))}
      </Article>

      <Register modal={post} onClick={handleModalWithData} users={users} category={category} />
      <Delete data={remove} setClose={() => setRemove(undefined)} />

    </Container>
  )
};
