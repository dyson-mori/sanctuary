
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useTheme } from "styled-components";

import { Header, Input } from "@common";
import { CategoryProps, CreatorProps } from "@global/interface";
import { serverActionCookie } from "@utils";
import { AddUser } from "@svg";

import { Button, Container, Footer, NewCategory } from "./styles";

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

      <NewCategory onClick={() => setModal(true)}>
        <AddUser width={25} height={25} stroke='white' strokeWidth={2} />
      </NewCategory>

      <Modal open={modal} onClickOutside={setModal}>
        <Input icon={AddUser} placeholder="add a new category" />
      </Modal>
    </>
  )
};
