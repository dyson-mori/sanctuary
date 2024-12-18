
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useTheme } from "styled-components";

import { Header, Button } from "@common";
import { CategoryProps, CreatorProps } from "@global/interface";
import { serverActionCookie } from "@utils";

import Register from "../_components/register";

import { Container, Footer } from "./styles";

type Props = {
  categories: CategoryProps[];
  creators: CreatorProps[];
};

export default function Categories({ categories, creators }: Props) {
  const theme = useTheme();
  const route = useRouter();

  const [selected, setSelected] = useState([] as CategoryProps[]);
  const [modal, setModal] = useState(false);
  
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
    <>
      <Header creators={creators} />

      <Container>
        {categories.map((row, index) => {
          const find = !!selected.find(({ id }) => row.id === id);

          return (
            <Button key={index} variant="select" disabled={row._count.post === 0} selected={find} style={{ height: 40, margin: 2, flexGrow: 1 }} onClick={() => handleSelect(row)}>
              {row?.name.replace('_', ' ')} - {row._count.post}
            </Button>
          )
        })}
        <Footer>
          <Button
            disabled={selected.length === 0}
            style={{
              height: 40,
              width: '20%',
              backgroundColor: theme.colors.primary,
              color: theme.colors.white,
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Footer>
      </Container>

      <Register modal={modal} setModal={setModal} />
    </>
  )
};
