"use client"

import { FC, useState } from 'react';
import Image from 'next/image';

import { Input } from '@common';
import { Search } from '@svg';

import { Container, Option } from './styles';
import { CreatorProps } from '@global/interface';

interface ModalProps {
  creators: CreatorProps[]
};

export const Creator: FC<ModalProps> = ({ creators }) => {
  const [search, setSearch] = useState('');

  const filter = creators.filter(f => f.name.includes(search.toLowerCase()))

  return (
    <Container>
      <Input icon={Search} placeholder='search about...' width='full' onChange={evt => setSearch(evt.target.value)} />
      <h2>Creators</h2>
      {
        filter.map((row, index) => (
          <Option key={index}>
            <Image src={'https://res.cloudinary.com/dyrtdrnky/image/upload/' + row.photo} width={50} height={50} alt={index.toString()} />

            <div className='sides'>
              <div className='upside'>
                <p>{row.name}</p>
                {/* <span />
                <p>yesterday</p> */}
              </div>
              <div className='downside'>
                <p>{row.description}</p>
                <p>row._count posts</p>
              </div>
            </div>
          </Option>
        ))
      }

    </Container>
  )
};