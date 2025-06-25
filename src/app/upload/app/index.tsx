"use client"

import { useState } from "react";

import axios from "axios";

import { Category } from "@prisma/client";

import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "@services/api";
import { format } from "@utils/format";
import { Button, Input, Modal, Tags, UploadFile } from "@common";
import { Money, MP4, Tag, Upload } from "@svg";

import { getSignedURL } from "./actions";
import { schema, schemaProps } from "./yup";
import { ButtonTag, Container, Form, SubContent, Categories, Progress } from "./styles";

type Props = {
  categories: Category[];
};

export default function UploadScreen({ categories }: Props) {
  const [variant, setVariant] = useState<'primary' | 'success' | 'error' | 'loading'>('primary');

  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema)
  });

  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);

  const computeSha256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    return hashHex;
  };

  const submit = async (form: schemaProps) => {
    setVariant('loading');

    const file = form.file[0];

    console.log(form);


    // if (file) {
    //   const checksum = await computeSha256(file)
    //   const signedUrlResult = await getSignedURL(file, file.type, file.size, checksum);

    //   if (signedUrlResult.failure !== undefined) {
    //     return console.log('failed')
    //   };

    //   const { urlForUpload } = signedUrlResult.success;

    //   await axios.put(urlForUpload, file, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //     onUploadProgress: e => {
    //       const percent = Math.round(e.loaded * 100) / e.total!;
    //       setProgress(parseInt(percent.toString()));
    //     },
    //   })
    //     .then(() =>
    //       handleSavingData({
    //         ...form,
    //         url: signedUrlResult.success.url,
    //         width: signedUrlResult.success.width,
    //         height: signedUrlResult.success.height,
    //       })
    //     )
    //     .catch(() => setVariant('error'))
    // };

    handleSavingData(form);
  };

  const handleSavingData = async (form: schemaProps) => {
    const isPrivate = format.parseCurrencyToFloat(form.price) > 0;

    console.log({
      isPrivate,
      test: format.parseCurrencyToFloat(form.price)
    });

    // const result = await api.posts.create({
    //   ...form,
    //   isPrivate: form.price?.trim() ? format.parseCurrencyToFloat(form.price) > 0 : false,
    //   price: form.price?.trim() ? format.parseCurrencyToFloat(form.price) : 0.0,
    // });

    // if (result.status !== 201) {
    //   return setMessage('Algo deu de errado ao salvar os dados!');
    // }

    // setMessage('Dados registrado com sucesso!');
    setVariant('success')
  };

  // const handleSubmit = async () => {
  //   setMessage('Upload Iniciado!');

  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append('file', file);

  //   setMessage('Lendo o Arquivo!');

  //   const res = await axios.post('http://localhost:3030/cdn/upload', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //     onUploadProgress: e => {
  //       const percent = Math.round(e.loaded * 100) / e.total!;
  //       setProgress(parseInt(percent.toString()));
  //     },
  //   });

  //   setMessage('Upload finalizado com sucesso!');


  // };

  return (
    <Container>
      <p color="#fff">{message}</p>
      <div style={{ height: 10 }} />

      <Form onSubmit={handleSubmit(submit)}>
        {/* {fileUrl && (
          <Progress>
            <span style={{ width: `${progress}%` }} />
          </Progress>
        )} */}

        <Controller
          name="file"
          control={control}
          render={({ field: { onChange } }) =>
            <UploadFile onChange={onChange} />
          }
        />

        <div className="row">
          <Controller
            name="price"
            control={control}
            render={({ field: { value, onChange } }) => {
              function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
                const raw = e.target.value
                const formatted = format.formatCurrency(raw)
                onChange(formatted)
              }
              return <Input icon={Money} value={value ?? ''} placeholder="R$ 0,00 (optional)" onChange={handleChange} />
            }}
          />
          <Tags icon={Tag} options={categories} onChange={evt => setValue('categories', evt)} />
        </div>
        <div style={{ height: 10 }} />
        <Button
          type="submit"
          variant={variant}
          style={{ width: '100%' }}
        // disabled={!fileUrl}
        >
          Upload
        </Button>
      </Form>
    </Container>
  )
};