"use client"

import { FC } from 'react';

import { Switch } from '../..';

import { useStorage } from '@hooks';
import { Sun } from '@svg';

import { Container, Card } from './styles';

export const Settings: FC = () => {
  const [storage, setStorage] = useStorage('@preview-videos', null);

  return (
    <Container>
      <h3>Settings</h3>
      <p className='description'>Build your layout according to your desires</p>

      <Card>
        <div>
          <h4>Appearance</h4>
          <p>choose the look that suits you best.</p>
        </div>
        <button>
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

      <div className='version'>
        <p>v 0.0.1</p>
      </div>

    </Container>
  )
};

