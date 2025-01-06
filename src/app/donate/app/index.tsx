"use client";

import Image from "next/image";
import { Header } from "@common";

import { Card, Container } from "./styles";
import { Database, PlanOne } from "@svg";

export default function DonatePage({ user }) {
  return (
    <>
      <Header user={user} />
      <Container>

        <Card>
          <Image
            style={{ width: '100%', objectFit: 'cover' }}
            src={PlanOne}
            width={500}
            height={500}
            alt="PlanOne"
          />

          <Database width={60} height={60} stroke="#fff" strokeWidth={1.5} />

          <h3>Database</h3>
        </Card>

      </Container>
    </>
  )
}