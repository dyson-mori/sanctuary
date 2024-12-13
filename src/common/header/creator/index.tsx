import { FC } from 'react';
import { Input } from '@common/input';
import { Search } from '@svg';

import { Container, Items } from './styles';
import Image from 'next/image';

export const Creator: FC = () => {
  return (
    <Container>
      <Input icon={Search} placeholder='search about...' width='full' />
      {
        [
          'https://res.cloudinary.com/dyrtdrnky/image/upload/v1734042540/community/creator/kabrina-starr.jpg',
          'https://res.cloudinary.com/dyrtdrnky/image/upload/v1731853020/community/creator/mollychan.png',
          'https://res.cloudinary.com/dyrtdrnky/image/upload/v1731790138/community/creator/violetmyers.jpg',
          'https://res.cloudinary.com/dyrtdrnky/image/upload/v1731247443/community/creator/mayhashira.jpg',
          'https://res.cloudinary.com/dyrtdrnky/image/upload/v1731106595/community/creator/whoahannahjo.jpg',
          'https://res.cloudinary.com/dyrtdrnky/image/upload/v1729636352/community/creator/archaical.jpg',
          'https://res.cloudinary.com/dyrtdrnky/image/upload/v1729560478/community/creator/officedistraction.jpg'
        ].map((row, index) => (
          <Items key={index}>
            <Image src={row} width={50} height={50} alt={index.toString()} />

            <div className='sides'>
              <div className='upside'>
                <p>Molleyflwer</p>
                {/* <span />
                <p>yesterday</p> */}
              </div>
              <div className='downside'>
                <p>short girl with a big ass</p>
                <p>127 posts</p>
              </div>
            </div>
          </Items>
        ))
      }
    </Container>
  )
};