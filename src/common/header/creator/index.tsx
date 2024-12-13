import { FC, useState } from 'react';
import { Input } from '@common/input';
import { Search } from '@svg';

import { Container, Option } from './styles';
import Image from 'next/image';

const data = [
  {
    name: '1',
    photo: 'https://res.cloudinary.com/dyrtdrnky/image/upload/v1734042540/community/creator/kabrina-starr.jpg',
  },
  {
    name: '2',
    photo: 'https://res.cloudinary.com/dyrtdrnky/image/upload/v1731853020/community/creator/mollychan.png',
  },
  {
    name: '3',
    photo: 'https://res.cloudinary.com/dyrtdrnky/image/upload/v1731790138/community/creator/violetmyers.jpg',
  },
  {
    name: '4',
    photo: 'https://res.cloudinary.com/dyrtdrnky/image/upload/v1731247443/community/creator/mayhashira.jpg',
  },
  {
    name: '5',
    photo: 'https://res.cloudinary.com/dyrtdrnky/image/upload/v1731106595/community/creator/whoahannahjo.jpg',
  },
  {
    name: '6',
    photo: 'https://res.cloudinary.com/dyrtdrnky/image/upload/v1729636352/community/creator/archaical.jpg',
  },
  {
    name: '7',
    photo: 'https://res.cloudinary.com/dyrtdrnky/image/upload/v1729560478/community/creator/officedistraction.jpg'
  },
]

export const Creator: FC = () => {
  const [search, setSearch] = useState('');

  const filter = data.filter(f => f.name.includes(search.toLowerCase()))

  return (
    <Container>
      <Input icon={Search} placeholder='search about...' width='full' onChange={evt => setSearch(evt.target.value)} />
      <h2>Creators</h2>
      {
        filter.map((row, index) => (
          <Option key={index}>
            <Image src={row.photo} width={50} height={50} alt={index.toString()} />

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
          </Option>
        ))
      }

    </Container>
  )
};