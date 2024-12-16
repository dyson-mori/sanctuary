"use client"

import { FC, useState } from 'react';
import Image from 'next/image';

import { Input } from '@common';
import { Search } from '@svg';

import { Container, Option, Tag } from './styles';
import { CreatorProps } from '@global/interface';
import { useRouter } from 'next/navigation';

interface ModalProps {
  creators: CreatorProps[]
};

export const Creator: FC<ModalProps> = ({ creators }) => {
  const route = useRouter();

  const [search, setSearch] = useState('');

  const filter = creators.filter(f => f.name.includes(search.toLowerCase()));

  function handleCreator(name: string) {
    route.push(`/creators/${name}`)
  };

  return (
    <Container>
      <Input icon={Search} placeholder='search about...' width='full' onChange={evt => setSearch(evt.target.value)} />
      <Tag>
        <span />
        <p>Creators</p>
        <span />
      </Tag>
      {
        filter.map((row, index) => (
          <Option key={index} onClick={() => handleCreator(row.name)}>
            <Image src={'https://res.cloudinary.com/dyrtdrnky/image/upload/' + row.photo} width={50} height={50} alt={index.toString()} />
            <div className='sides'>
              <div className='upside'>
                <p>{row.name}</p>
              </div>
              <div className='downside'>
                <p>{row.description}</p>
                <p>{row._count.post} posts</p>
              </div>
            </div>
          </Option>
        ))
      }

    </Container>
  )
};