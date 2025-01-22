"use client"

import { FC, Fragment, useState } from 'react';

import Image from 'next/image';

import { useTheme } from 'styled-components';

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from "yup";

import { Button, Input, Modal } from '../..';

import { api } from '@services';
import { User, Lock, Logo } from '@svg';
import { custom_revalidate, serverActionCookie } from '@utils';
import { UserProps } from '@global/interface';

import { ButtonLink, Button as ButtonStyled } from './styles';
import Link from 'next/link';

const schema = yup.object({
  nickname: yup.string().required(),
  password: yup.string().required(),
});

type schemaProps = yup.InferType<typeof schema>;

const Authentication: FC<{ user: UserProps }> = ({ user }) => {
  const themes = useTheme();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });

  const [modal, setModal] = useState(false);

  const [variant, setVariant] = useState<'primary' | 'loading' | 'error'>('primary');

  const submit = async (data: schemaProps) => {
    setVariant('loading');

    const user = await api.auth.auth(data);

    if (!user) {
      setVariant('error');
      return console.log(user)
    };

    await serverActionCookie('auth-token', user);

    setModal(false);
    setVariant('primary');
    custom_revalidate('/post');
    custom_revalidate('/auth');
  };

  return (
    <Fragment>
      {
        user ?
          <ButtonLink href='/profile'>
            <Image src={'https://res.cloudinary.com/dyrtdrnky/image/upload/' + user.photo} width={25} height={25} alt='photo' style={{ borderRadius: 50 }} />
          </ButtonLink>
          :
          <ButtonStyled onClick={() => setModal(true)}>
            <User width={22} height={22} strokeWidth={1.5} />
          </ButtonStyled>
      }

      <Modal as='form' open={modal} onClickOutside={setModal} style={{ padding: '40px 0' }} onSubmit={handleSubmit(submit)}>
        <Logo id="logo" width={60} height={60} stroke={themes.colors.primary} strokeWidth={10} />

        <div style={{ height: 30 }} />

        <Controller
          name="nickname"
          control={control}
          render={({ field: { onChange } }) =>
            <Input icon={User} width="medium" placeholder="nickname" onChange={onChange} />
          }
        />

        <div style={{ height: 10 }} />

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange } }) =>
            <Input icon={Lock} type='password' width="medium" placeholder="password" onChange={onChange} />
          }
        />

        <div style={{ height: 10 }} />

        <Link href='/register' style={{ textAlign: 'end', width: '80%', fontSize: 13 }}>criar uma conta</Link>

        <div style={{ height: 10 }} />

        <Button type="submit" variant={variant}>
          {variant === 'error' ? 'fail' : 'login'}
        </Button>
      </Modal>
    </Fragment>
  )
};

export default Authentication;