import { Fragment } from 'react';

import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { useTheme } from 'styled-components';

import { Logo } from '@svg';

import { Container, Logo as LogoStyled, Nav } from './styles';

import Users from './creator';
import Settings from './settings';

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

export const Head = () => {
  const theme = useTheme();
  const path = usePathname();

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

        <Users users={[]} />
        <Settings user={{ nickname: 'dyson', photo: 'v1734808334/community/users/3afeaec84f4c0bd40fb5a891a7e96edf_apysrz_xfq0rj.jpg' }} />
      </Container>

    </Fragment>
  )
};