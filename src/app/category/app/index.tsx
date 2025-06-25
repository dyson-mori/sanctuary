
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Search } from "@svg";
import { Button, Input } from "@common";
import { CategoryProps } from "@global/interface";
import { serverActionCookie } from "@utils/actions";

import { Container, Content, Footer, ContainerInput } from "./styles";

type Props = {
  data: CategoryProps[];
};

export default function Categories({ data }: Props) {
  const route = useRouter();

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([] as CategoryProps[]);

  const filter = data.filter(row => row.title.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = async (row: CategoryProps) => {
    // navigator.clipboard.writeText(row.id)
    //   .then(() => setSelected(prev => [...prev, row]))

    if (row?._count.video === 0) return;

    const found = selected.find(item => item.id === row.id);

    if (found) return setSelected(selected.filter(item => item.id !== row.id));

    if (selected.length >= 3) return;

    return setSelected(prev => [...prev, row]);
  };

  function handleSearch() {
    route.push(`/feed?tags=${selected.map(({ title }) => title.replace(' ', '_')).toString()}`);

    // return serverActionCookie('search', `tags=${selected.map(({ title }) => title).toString()}`)
    //   .then(() => route.push(`/feed`))
  };

  return (
    <Container>

      <ContainerInput>
        <Input icon={Search} placeholder="title" onChange={e => setSearch(e.target.value)} width="medium" />
      </ContainerInput>

      <Content>
        <div>
          {filter.map((row, index) => {
            const find = !!selected.find(({ id }) => row.id === id);
            const variant = find ? "selected" : "select"

            return (
              <Button
                key={index}
                variant={variant}
                disabled={row._count.video === 0}
                style={{ height: 40, margin: 2, flexGrow: 1 }}
                onClick={() => handleSelect(row)}
              >
                {row?.title.replace('_', ' ')} - {row._count.video}
              </Button>
            )
          })}
        </div>
      </Content>

      <Footer>
        <Button disabled={selected.length === 0} variant="primary" onClick={handleSearch}>
          search
        </Button>
      </Footer>
    </Container>
  )
};
