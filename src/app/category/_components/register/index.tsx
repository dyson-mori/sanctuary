import { useState } from "react";

import { Input, Modal, Button } from "@common";
import { Tag } from "@svg";
import { api } from "@services";

import { NewCategory } from "./styles";

type Props = {
  modal: boolean;
  setModal: (a: boolean) => void;
};

export default function Register({ modal, setModal }: Props) {
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function register() {
    setLoading(true);
    try {
      await api.category.create({
        name: name!.replaceAll(' ', '_')
      }).then(() => setModal(false))
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    };
  };

  return (
    <>
      <NewCategory onClick={() => setModal(true)}>
        <Tag width={25} height={25} stroke='white' strokeWidth={2} />
      </NewCategory>

      <Modal open={modal} onClickOutside={setModal}>
        <div style={{ height: 20 }} />

        <Input icon={Tag} placeholder="new category" onChange={e => setName(e.target.value)} />

        <div style={{ height: 20 }} />

        <Button disabled={loading} onClick={register} style={{ height: 40 }}>
          Register
        </Button>
      </Modal>
    </>
  )
};
