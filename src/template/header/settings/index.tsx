"use client"

import { Fragment, useState } from 'react';

import { Switch } from '@common';

import { useTheme } from '@context/themeContext';
import { usePlay } from '@context/autoPlayContext';
import { Sun, Settings as SettingsSvg, Moon } from '@svg';

import { Container, Card, Button } from './styles';

export default function Settings() {
  const { themeName, toggleTheme } = useTheme();
  const { autoPlay, togglePlay } = usePlay();

  const [modal, setModal] = useState(false);

  return (
    <Fragment>
      <Button onClick={() => setModal(true)}>
        <SettingsSvg width={22} height={22} strokeWidth={1.5} />
      </Button>
      <Container open={modal} onClickOutside={setModal}>
        <h3>Settings</h3>
        <p className='description'>Build your layout according to your desires</p>

        <Card onClick={toggleTheme}>
          <div className='info'>
            <h4>Appearance</h4>
            <p>choose the look that suits you best.</p>
          </div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: 40 }}>
            <Sun style={{ position: 'absolute', opacity: themeName === 'light' ? 1 : 0, transition: '0.3s' }} width={25} height={25} fill='#EB5B00' strokeWidth={1} />
            <Moon style={{ position: 'absolute', opacity: themeName === 'dark' ? 1 : 0, transition: '0.3s' }} width={25} height={25} fill='#EB5B00' strokeWidth={1} />
          </div>
        </Card>

        <Card>
          <div className='info'>
            <h4>Preview Videos</h4>
            <p>enable video preview?</p>
          </div>
          <Switch value={autoPlay} setCheck={togglePlay} />
        </Card>

        <div className='version'>
          <p>v 0.0.1</p>
        </div>
      </Container>
    </Fragment>
  )
};