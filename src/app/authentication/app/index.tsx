"use client"

import { useTheme } from "styled-components";

import { Button, Input } from "@common";
import { Logo, User } from "@svg";

import { Container, Form } from "./styles";

export default function Authentication() {
  const theme = useTheme();

  return (
    <Container>

      <Form>
        <Logo width={60} height={60} stroke={theme.colors.primary} strokeWidth={10} />
        <div style={{ height: 30 }} />
        <Input icon={User} width="medium" placeholder="nickname" />
        <div style={{ height: 10 }} />
        <Input icon={User} width="medium" placeholder="password" />
        <div style={{ height: 10 }} />
        <Button type="submit">login</Button>
      </Form>

    </Container>
  )
}