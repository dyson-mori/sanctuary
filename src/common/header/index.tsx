import { FC, Fragment, useState } from 'react';

import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { useTheme } from 'styled-components';

import { Logo, Search } from '@svg';

import { Container, Logo as LogoStyled, Nav, Button } from './styles';

import { Modal } from '../modal';
import { Creator } from './creator';

const links = [
  {
    path: '/',
    name: 'Posts'
  },
  {
    path: '/category',
    name: 'Categories'
  }
];

export const Header: FC = () => {
  const theme = useTheme();
  const path = usePathname();

  const [open, setOpen] = useState(false);

  return path !== '/s' && (
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
          {/* <Link href={{ pathname: '/' }}>Donate Me</Link> */}
        </Nav>

        <Button onClick={() => setOpen(true)}>
          <Search width={22} height={22} stroke='#707070aa' strokeWidth={1.5} />
        </Button>
      </Container>

      <Modal open={open} onClickOutside={() => setOpen(false)}>
        <Creator />
      </Modal>
    </Fragment>
  )
};