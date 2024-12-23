"use client"

import { FC } from 'react';
import Link from 'next/link';

import { User } from '@prisma/client';
import { useTheme } from 'styled-components';

import { Switch } from '../..';

import { useStorage } from '@hooks';
import { Sun, User as UserSvg } from '@svg';

import { Container, Card } from './styles';
import Image from 'next/image';

export const Settings: FC<{ user: User }> = ({ user }) => {
  const themes = useTheme();

  const [storage, setStorage] = useStorage('@preview-videos', null);
  const [theme, setTheme] = useStorage('@dark-mode', null);

  return (
    <Container>
      <h3>Settings</h3>
      <p className='description'>Build your layout according to your desires</p>

      <Card>
        <div>
          <h4>Appearance</h4>
          <p>choose the look that suits you best.</p>
        </div>
        <button onClick={() => setTheme(!theme)}>
          <Sun width={25} height={25} stroke='#EB5B00' strokeWidth={1} />
        </button>
      </Card>

      <Card>
        <div>
          <h4>Preview Videos</h4>
          <p>choose the look that suits you best.</p>
        </div>
        <Switch value={storage} setCheck={setStorage} />
      </Card>

      <Card>
        <div>
          <h4>{user ? user.nickname : 'Authentication'}</h4>
          {!user && <p>login to interact with the videos</p>}
        </div>
        {user ? (
          <Link href='/profile'>
            <Image src={'https://res.cloudinary.com/dyrtdrnky/image/upload/' + user.photo} width={50} height={50} alt='photo' style={{ borderRadius: 6 }} />
          </Link>
        ) : (
            <Link href='/authentication'>
              <UserSvg width={25} height={25} stroke={themes.colors.primary} strokeWidth={2} />
            </Link>
        )}
      </Card>

      <div className='version'>
        <p>v 0.0.1</p>
      </div>

    </Container>
  )
};

