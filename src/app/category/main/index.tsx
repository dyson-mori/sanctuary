
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useTheme } from "styled-components";

import { CategoryProps } from "@global/interface";
import { serverActionCookie } from "@utils";

import { Button, Container, Footer } from "./styles";

type Props = {
  categories: CategoryProps[]
};

export default function Categories({ categories }: Props) {
  const theme = useTheme();
  const route = useRouter();

  const [selected, setSelected] = useState([] as CategoryProps[]);

  const handleSelect = async (row: CategoryProps) => {
    // navigator.clipboard.writeText(row.id)
    //   .then(() => setSelected(prev => [...prev, row]))

    if (row?._count.post === 0) return;

    const found = selected.find(item => item.id === row.id);

    if (found) return setSelected(selected.filter(item => item.id !== row.id));

    if (selected.length >= 3) return; 

    return setSelected(prev => [...prev, row]);
  };

  const handleSearch = async () => {
    serverActionCookie('search', `tags=${selected.map(({ name }) => name).toString()}`);
    return route.push('/search');
  };

  return (
    <Container>
      {categories.map((row, index) => {
        const find = selected.find(({ id }) => row.id === id);
        const style = {
          fontWeight: find ? 600 : 500,
          backgroundColor: theme.colors[find ? 'primary' : 'white'],
          color: theme.colors[find ? 'white' : 'text'],
          cursor: row._count.post === 0 ? 'default' : 'pointer'
        };

        return (
          <Button key={index} disabled={row._count.post === 0} style={style} onClick={() => handleSelect(row)}>
            {row?.name.replace('_', ' ')} - {row._count.post}
          </Button>
        )
      })}
      <Footer>
        <Button
          disabled={selected.length === 0}
          style={{
            width: 300,
            height: 40,
            backgroundColor: theme.colors.primary,
            color: theme.colors.white,
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Footer>
    </Container>
  )
};