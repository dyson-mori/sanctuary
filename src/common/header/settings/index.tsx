"use client"

import { FC, Fragment, useState } from 'react';
import Link from 'next/link';

import Image from 'next/image';

import { User } from '@prisma/client';
import { useTheme } from 'styled-components';

import { Modal, Switch } from '../..';

import { useStorage } from '@hooks';
import { Sun, User as UserSvg, Settings as SettingsSvg } from '@svg';

import { Container, Card, Button } from './styles';

const Settings: FC<{ user: User }> = ({ user }) => {
  const themes = useTheme();

  const [storage, setStorage] = useStorage('@preview-videos', null);
  const [theme, setTheme] = useStorage('@dark-mode', null);
  const [modal, setModal] = useState(false);

  return (
    <Fragment>
      <Button onClick={() => setModal(true)}>
        <SettingsSvg width={22} height={22} stroke={themes.colors.primary} strokeWidth={1.5} />
      </Button>
      <Modal open={modal} onClickOutside={setModal}>
        <Container>
          <h3>Settings</h3>
          <p className='description'>Build your layout according to your desires</p>

          <Card onClick={() => setTheme(!theme)}>
            <div className='info'>
              <h4>Appearance</h4>
              <p>choose the look that suits you best.</p>
            </div>
            <Sun width={25} height={25} stroke='#EB5B00' strokeWidth={1} />
          </Card>

          <Card>
            <div className='info'>
              <h4>Preview Videos</h4>
              <p>choose the look that suits you best.</p>
            </div>
            <Switch value={storage} setCheck={setStorage} />
          </Card>

          <Link href={user ? '/profile' : '/authentication'}>
            <Card>
              <div className='info'>
                <h4>{user ? user.nickname : 'Authentication'}</h4>
                {!user && <p>login to interact with the videos</p>}
              </div>
              {user ? (
                <Image src={'https://res.cloudinary.com/dyrtdrnky/image/upload/' + user.photo} width={50} height={50} alt='photo' style={{ borderRadius: 6 }} />
              ) : (
                  <UserSvg width={25} height={25} stroke={themes.colors.primary} strokeWidth={2} />
              )}
            </Card>
          </Link>

          <div className='version'>
            <p>v 0.0.1</p>
          </div>
        </Container>
      </Modal>
    </Fragment>
  )
};

export default Settings;