"use client"

import { FC, Fragment, useState } from 'react';

import { useTheme } from 'styled-components';

import { Modal, Switch } from '../..';

import { useStorage } from '@hooks';
import { Sun, Settings as SettingsSvg } from '@svg';

import { Container, Card, Button } from './styles';

const Settings: FC = () => {
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

          <div className='version'>
            <p>v 0.0.1</p>
          </div>
        </Container>
      </Modal>
    </Fragment>
  )
};

export default Settings;