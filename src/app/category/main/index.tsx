
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Header, Button } from "@common";
import { CategoryProps, UserProps } from "@global/interface";

// import Register from "../_components/register";

import { Container, Content, Footer } from "./styles";

type Props = {
  categories: CategoryProps[];
  user: UserProps;
};

export default function Categories({ categories, user }: Props) {
  const route = useRouter();

  const [selected, setSelected] = useState([] as CategoryProps[]);
  // const [modal, setModal] = useState(false);
  
  const handleSelect = async (row: CategoryProps) => {
    // navigator.clipboard.writeText(row.id)
    //   .then(() => setSelected(prev => [...prev, row]))

    if (row?._count.post === 0) return;

    const found = selected.find(item => item.id === row.id);

    if (found) return setSelected(selected.filter(item => item.id !== row.id));

    if (selected.length >= 3) return; 

    return setSelected(prev => [...prev, row]);
  };

  function handleSearch() {
    route.push(`/tags=${selected.map(({ name }) => name).toString()}`);
  };

  return (
    <>
      <Header user={user} />

      <Container>
        <Content>
          {categories.map((row, index) => {
            const find = !!selected.find(({ id }) => row.id === id);

            return (
              <Button key={index} variant={find ? "selected" : "select"} disabled={row._count.post === 0} style={{ height: 40, margin: 2, flexGrow: 1 }} onClick={() => handleSelect(row)}>
                {row?.name.replace('_', ' ')} - {row._count.post}
              </Button>
            )
          })}
        </Content>

        <Footer>
          <Button disabled={selected.length === 0} variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </Footer>
      </Container>

      {/* <Register modal={modal} setModal={setModal} /> */}
    </>
  )
};
