"use client"

import { FC } from 'react';

import { Switch } from '../..';

import { Card, Container } from './styles';

export const Settings: FC = () => {
  return (
    <Container>

      <Card>
        <p>video preview enable</p>
        <Switch setCheck={console.log} />
      </Card>

      <Card>
        <p>theme</p>
        <Switch setCheck={console.log} />
      </Card>

    </Container>
  )
};

