import { CSSProperties, FC, useEffect, useState } from "react";
import { useTheme } from "styled-components";

import { Tag } from "@svg";

import { Modal } from "../modal";
import { Button } from "../button";

import { Container } from "./styles";

type CategoryFilter = {
  id: string;
  name: string;
};

type Props = {
  categories: CategoryFilter[];
  onChange: (a: CategoryFilter[]) => void;
};

export const Tags: FC<Props> = ({ categories, onChange }) => {
  const theme = useTheme();

  const [open, setopen] = useState(false);
  const [selected, setSelected] = useState([] as CategoryFilter[]);

  const handleSelect = async (row: CategoryFilter) => {
    const found = selected.find(item => item.id === row.id);

    if (found) {
      const t = selected.filter(item => item.id !== row.id)
      return setSelected(t)
    };

    return setSelected(prev => [...prev, row]);
  };

  const styles: CSSProperties = {
    flexDirection: 'row',
    flexWrap: 'wrap',
  };

  useEffect(() => onChange(selected), [selected])

  return (
    <>
      <Container type="button" onClick={() => setopen(true)}>
        <p>{selected.length}</p>
        <Tag width={21} height={21} stroke={theme.colors.white} strokeWidth={2} />
      </Container>
      <Modal open={open} onClickOutside={setopen} style={styles}>
        {categories.map((row, index) => {
          const find = selected.find(({ id }) => row.id === id);
          const style = {
            fontWeight: find ? 600 : 500,
            backgroundColor: theme.colors[find ? 'primary' : 'white'],
            color: theme.colors[find ? 'white' : 'text'],
            flexGrow: 1,
            margin: 2,
            padding: '0 5px',
            height: 40
          };

          return (
            <Button key={index} type="button" style={style} onClick={() => handleSelect(row)}>
              {row?.name.replace('_', ' ')}
            </Button>
          )
        })}
      </Modal>
    </>
  )
};