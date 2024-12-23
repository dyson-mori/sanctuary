import { FC, Fragment, Suspense } from 'react';

import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { useTheme } from 'styled-components';

import { UserProps } from '@global/interface';

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

interface Props {
  user: UserProps;
  users: UserProps[];
};

export const Header: FC<Props> = ({ user, users }) => {
  const theme = useTheme();
  const path = usePathname();

  const hide = path.includes('/s') || path.includes('/upload');

  return !hide && (
    <Suspense fallback={<>load</>}>
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

        <Users users={users} />
        <Settings user={user} />
      </Container>

    </Suspense>
  )
};