"use client"

import { FC, Fragment, useState } from 'react';

import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { useTheme } from 'styled-components';

import { Logo, Search, Settings as SettingsSvg } from '@svg';

import { UserProps } from '@global/interface';

import { Container, Logo as LogoStyled, Nav, Button } from './styles';

import { Modal } from '../modal';

import { Creator } from './creator';
import { Settings } from './settings';
import { User } from '@prisma/client';

const links = [
  {
    path: '/',
    name: 'Posts'
  },
  {
    path: '/category',
    name: 'Categories'
  },
  // {
  //   path: '/creators',
  //   name: 'Creators'
  // }
];

interface HeaderProps {
  users: UserProps[];
  user: User;
};

export const Header: FC<HeaderProps> = ({ users, user }) => {
  const theme = useTheme();
  const path = usePathname();

  const [modalCreator, setModalCreator] = useState(false);
  const [modalSettings, setModalSettings] = useState(false);

  const hide = path.includes('/s') || path.includes('/upload');

  return !hide && (
    <Fragment>
      <Container>
        <LogoStyled>
          <Logo width={30} height={30} stroke={theme.colors.primary} strokeWidth={15} />
        </LogoStyled>

        <Nav>
          {
            links.map(row => (
              <Link
                key={row.path}
                href={{ pathname: row.path }}
                style={{
                  color: theme.colors[path === row.path ? 'primary' : 'text'],
                  fontWeight: path === row.path ? 700 : 500
                }}
              >
                {row.name}
              </Link>
            ))
          }
        </Nav>

        <Button onClick={() => setModalCreator(true)}>
          <Search width={22} height={22} stroke={theme.colors.primary} strokeWidth={1.5} />
        </Button>
        <Button onClick={() => setModalSettings(true)}>
          <SettingsSvg width={22} height={22} stroke={theme.colors.primary} strokeWidth={1.5} />
        </Button>
      </Container>

      <Modal open={modalCreator} onClickOutside={() => setModalCreator(false)}>
        <Creator users={users} />
      </Modal>

      <Modal open={modalSettings} onClickOutside={() => setModalSettings(false)} style={{ padding: 50 }}>
        <Settings user={user} />
      </Modal>
    </Fragment>
  )
};