'use client'

import { Select, Tags } from "@common";
import { Tag, User } from "@svg";

export const ComponentTest = () => {
  const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }

  return (
    <main style={styles}>
      <Tags />
    </main>
  )
};