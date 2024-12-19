import { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input, Modal, Button } from "@common";
import { Tag } from "@svg";
import { api } from "@services";

import * as yup from "yup";

import { NewCategory } from "./styles";

type Props = {
  modal: boolean;
  setModal: (a: boolean) => void;
};

const schema = yup.object({
  new_category: yup.string().required()
});

type schemaProps = yup.InferType<typeof schema>;

export default function Register({ modal, setModal }: Props) {
  const { control, handleSubmit, resetField } = useForm({
    resolver: yupResolver(schema)
  });

  const [loading, setLoading] = useState(false);

  async function register(data: schemaProps) {
    setLoading(true);

    try {
      await api.category.create({
        name: data.new_category.replaceAll(' ', '_')
      }).then(() => {
        setModal(false);
        resetField('new_category');
      })
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

      <Modal as="form" open={modal} onClickOutside={setModal} style={{ padding: '50px 25px' }} onSubmit={handleSubmit(register)}>
        <Controller
          name="new_category"
          control={control}
          render={({ field: { value, ...rest } }) =>
            <Input icon={Tag} value={value ?? ""} placeholder="new category" {...rest} />
          }
        />

        <div style={{ height: 20 }} />

        <Button type="submit" disabled={loading} style={{ height: 40 }}>
          Register
        </Button>
      </Modal>
    </>
  )
};
