import { CSSProperties, FC, useEffect, useState } from "react";
import { useTheme } from "styled-components";

import { Modal } from "../modal";
import { Button } from "../button";

import { Container } from "./styles";

type OptionsProps = {
  id: string;
  name: string;
  selected: boolean;
};

type Props = {
  options: OptionsProps[];
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onChange: (a: OptionsProps[]) => void;
};

export const Tags: FC<Props> = ({ icon: Icon, options, onChange }) => {
  const theme = useTheme();

  const [open, setopen] = useState(false);
  const [selected, setSelected] = useState(options);

  const handleSelect = async (row: OptionsProps) => {
    setSelected(prev => prev.map(select =>
      select.id === row.id ? { ...select, selected: !row.selected } : select
    ));
  };

  const styles: CSSProperties = {
    flexDirection: 'row',
    flexWrap: 'wrap',
  };

  useEffect(() => onChange(selected.filter(r => !!r.selected)), [selected]);

  return (
    <>
      <Container type="button" onClick={() => setopen(true)}>
        <p>{selected.filter(e => e.selected).length}</p>
        <Icon width={21} height={21} stroke={theme.colors.white} strokeWidth={2} />
      </Container>

      <Modal open={open} onClickOutside={setopen} style={styles}>
        {selected.map((row, index) => {
          const style = {
            flexGrow: 1,
            margin: 2,
            padding: '0 5px',
            height: 40
          };

          return (
            <Button key={index} variant={row.selected ? "selected" : "select"} type="button" style={style} onClick={() => handleSelect(row)}>
              {row?.name.replace('_', ' ')}
            </Button>
          )
        })}
      </Modal>
    </>
  )
};