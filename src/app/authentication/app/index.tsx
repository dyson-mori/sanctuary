"use client"
import { useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from "yup";

import { api } from "@services";
import { Button, Input } from "@common";
import { serverActionCookie } from "@utils";
import { Google, Lock, Logo, User } from "@svg";

import { Container, Form } from "./styles";

const schema = yup.object({
  nickname: yup.string().required(),
  password: yup.string().required(),
});

type schemaProps = yup.InferType<typeof schema>;

export default function Authentication() {
  const route = useRouter();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });

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

    route.push('/profile');

    // setLoading(false);
    // setVariant('primary');
  };

  return (
    <Container>

      <Form onSubmit={handleSubmit(submit)}>
        <Logo id="logo" width={60} height={60} strokeWidth={10} />
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
            <Input icon={Lock} width="medium" placeholder="password" onChange={onChange} />
          }
        />
        <div style={{ height: 10 }} />

        <Link href='/register' style={{ textAlign: 'end', width: '100%' }}>I don't have an account yet</Link>

        <div style={{ height: 5 }} />

        <Button type="submit" variant={variant} loading={loading} disabled={loading}>
          {variant === 'error' ? 'fail' : 'login'}
        </Button>

        <div style={{ height: 10 }} />

        <div className="with">
          <span />
          <p>login with</p>
          <span />
        </div>

        <div style={{ height: 10 }} />

        <Google width={25} height={25} />
      </Form>

    </Container>
  )
}