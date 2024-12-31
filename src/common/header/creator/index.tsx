"use client"

import { Fragment, useState } from 'react';

import Image from 'next/image';

import { useTheme } from 'styled-components';

import { Input, Modal } from '@common';
import { Search } from '@svg';

import { Container, Option, Tag, Button } from './styles';
import { UserProps } from '@global/interface';

interface ModalProps {
  users: UserProps[];
};

export default function Creator({ users }: ModalProps) {
  const theme = useTheme();

  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);

  const filter = users?.filter(f => f.nickname.includes(search.toLowerCase())) ?? [];

  function handleCreator() {
    // route.push(`/creators/${name}`)
  };

  return (
    <Fragment>
      <Button onClick={() => setModal(true)}>
        <Search width={22} height={22} stroke={theme.colors.primary} strokeWidth={1.5} />
      </Button>

      <Modal open={modal} onClickOutside={setModal}>
        <Container>
          <Input icon={Search} placeholder='search about...' width='full' onChange={evt => setSearch(evt.target.value)} />
          <Tag>
            <span />
            <p>Creators</p>
            <span />
          </Tag>
          {
            filter.map((row, index) => {
              // const image = JSON.parse(row.cloudinary_photo);
              return (
                <Option key={index} onClick={() => handleCreator()}>
                  <Image src={'https://res.cloudinary.com/dyrtdrnky/image/upload/' + row.photo} width={50} height={50} alt={index.toString()} />
                  <div className='sides'>
                    <div className='upside'>
                      <p>{row.nickname}</p>
                    </div>
                    <div className='downside'>
                      <p>row.description</p>
                      <p>{row._count.post} posts</p>
                    </div>
                  </div>
                </Option>
              )
            })
          }
        </Container>
      </Modal>
    </Fragment>
  )
};