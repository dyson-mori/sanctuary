import Image from 'next/image';
import Link from 'next/link';

import { Logout, User } from '@svg';

import { serverSighOut } from '@utils/actions';
import { Container, Button } from "./styles";

export default function Avatar({ user, onClick }) {
  const handleClick = () => onClick(true);

  return Object.keys(user).length !== 0 ? (
    <Container>

      <div className="dropdown-container">
        <Image src={user.photo!} width={25} height={25} alt='photo' />
        <div className='dropdown-content'>
          <Link href="/profile">
            <User width={22} height={22} strokeWidth={1.5} />
            Profile
          </Link>
          <Link href="/" onClick={serverSighOut}>
            <Logout width={22} height={22} strokeWidth={1.5} />
            Sign Out
          </Link>
        </div>
      </div>

    </Container>
  ) : (
    <Button onClick={handleClick}>
      <User width={22} height={22} strokeWidth={1.5} />
    </Button>
  )
};
