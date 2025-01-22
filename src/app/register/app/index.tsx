"use client"

import { useState } from "react";

import * as yup from "yup";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { api } from "@services";
import { User, Lock, Logo } from "@svg";
import { Input, Button, Upload } from "@common";

import { Container } from "./styles";

const schema = yup.object({
  nickname: yup.string().required(),
  password: yup.string().required(),
});

type schemaProps = yup.InferType<typeof schema>;

export default function RegisterApp() {
  const [variant, setVariant] = useState<'primary' | 'loading' | 'error'>('primary');

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });

  const submit = async (data: schemaProps) => {
    setVariant('loading');

    const user = await api.user.create(data);

    if (!user) {
      setVariant('error');
      return console.log(user)
    };

    // await serverActionCookie('auth-token', user);

    // setModal(false);
    setVariant('primary');
    // custom_revalidate('/post');
    // custom_revalidate('/auth');
  };

  return (
    <Container onSubmit={handleSubmit(submit)}>
      <Logo id="logo" width={80} height={80} strokeWidth={8} />

      <Controller
        name="nickname"
        control={control}
        render={({ field: { onChange } }) =>
          <Input icon={User} width="medium" placeholder="nickname" onChange={onChange} />
        }
      />

      <Controller
        name="password"
        control={control}
        render={({ field: { onChange } }) =>
          <Input icon={Lock} width="medium" placeholder="password" onChange={onChange} />
        }
      />

      <Input icon={Lock} width="medium" placeholder="repeat password" onChange={() => { }} />
      <Button type="submit" variant={variant}>
        {variant === 'error' ? 'fail' : 'register'}
      </Button>
    </Container>
  )
}