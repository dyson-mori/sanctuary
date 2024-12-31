"use client"

import { FC, Fragment, useState } from 'react';

import { useTheme } from 'styled-components';

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from "yup";

import { Button, Input, Modal } from '../..';

import { api } from '@services';
import { User, Lock, Logo } from '@svg';
import { custom_revalidate, serverActionCookie } from '@utils';
import { UserProps } from '@global/interface';

import { Button as ButtonStyled } from './styles';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const schema = yup.object({
  nickname: yup.string().required(),
  password: yup.string().required(),
});

type schemaProps = yup.InferType<typeof schema>;

const Authentication: FC<{ user: UserProps }> = ({ user }) => {
  const themes = useTheme();
  const route = useRouter();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });

  const [modal, setModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [variant, setVariant] = useState<'primary' | 'error'>('primary');

  const submit = async (data: schemaProps) => {
    setLoading(true);
    setVariant('primary');

    const user = await api.auth.auth(data);

    if (!user) {
      setLoading(false);
      setVariant('error');
      return console.log(user)
    };

    await serverActionCookie('auth-token', user);

    setModal(false);
    setLoading(false);
    setVariant('primary');
    custom_revalidate('/post');
  };

  const handleButton = () => {
    if (!!user) {
      return route.push('/profile')
    }
    return setModal(true);
  };

  return (
    <Fragment>

      <ButtonStyled onClick={handleButton}>
        {
          user ?
            <Image src={'https://res.cloudinary.com/dyrtdrnky/image/upload/' + user.photo} width={25} height={25} alt='photo' style={{ borderRadius: 50 }} /> :
            <User width={22} height={22} stroke={themes.colors.primary} strokeWidth={1.5} />
        }
      </ButtonStyled>

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

        {/* <div style={{ height: 10 }} />

        <Link href='/register' style={{ textAlign: 'end', width: '100%' }}>I dont have an account yet</Link> */}

        <div style={{ height: 5 }} />

        <Button type="submit" variant={variant} loading={loading} disabled={loading}>
          {variant === 'error' ? 'fail' : 'login'}
        </Button>
      </Modal>
    </Fragment>
  )
};

export default Authentication;