import Image from 'next/image';

import { PostProps } from '@global/interface';
import { capitalizeFirstLetter } from '@utils';

import { Header } from "./styles";

export const HeaderAside = ({ posts }: { posts: PostProps[] }) => {
  return (
    <Header>
      <Image
        width={50}
        height={50}
        src={`https://res.cloudinary.com/dyrtdrnky/image/upload/${posts[0].user.photo}`}
        alt='photo'
        style={{ borderRadius: 30, objectFit: 'cover' }}
      />
      <div className='info'>
        <a href={`/creators/${posts[0].user.nickname}`}>{capitalizeFirstLetter(posts[0].user.nickname)}</a>
        <p>posts[0].user.description</p>
      </div>
    </Header>
  )
};