import { FC, useEffect, useState } from "react";
import { useTheme } from "styled-components";

import { Tag } from "@svg";

import { Modal } from "../modal";
import { Button } from "../button";

import { Container, Content, Title } from "./styles";
import { Input } from "../input";

type OptionsProps = {
  id: string;
  title: string;
  selected?: boolean;
};

type Props = {
  options: OptionsProps[];
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onChange: (a: OptionsProps[]) => void;
};

export const Tags: FC<Props> = ({ icon: Icon, options, onChange }) => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(options);

  const handleSelect = async (row: OptionsProps) => {
    setSelected(prev => prev.map(select =>
      select.id === row.id ? { ...select, selected: !row.selected } : select
    ));
  };

  useEffect(() => onChange(selected.filter(r => !!r.selected)), [selected]);

  return (
    <>
      <Container type="button" onClick={() => setOpen(true)}>
        <p>{selected.filter(e => e.selected).length}</p>
        <Icon width={21} height={21} stroke={theme.colors.white} strokeWidth={2} />
      </Container>

      <Modal open={open} onClickOutside={setOpen} style={{ margin: '0 40px' }}>
        <Title>
          <Input icon={Tag} name="categories" placeholder="search categories" onChange={e => setSearch(e.target.value)} />
        </Title>

        <Content>
          {selected.filter(e => e.title.includes(search.toLowerCase())).map((row, index) => {
            const style = {
              flexGrow: 1,
              margin: 2,
              padding: '0 5px',
              height: 40
            };

            return (
              <Button key={index} variant={row.selected ? "selected" : "select"} type="button" style={style} onClick={() => handleSelect(row)}>
                {row?.title.replaceAll('_', ' ')}
              </Button>
            )
          })}
        </Content>
      </Modal>
    </>
  )
};