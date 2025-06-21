"use client"

import { useState } from "react";

import axios from "axios";

import { Button, Input } from "@common";
import api from "@services/api";
import { Money, MP4, Upload } from "@svg";

import { Categories, Container, UploadStyled, Form, SubContent } from "./styles";
import { Category } from "@prisma/client";

type Props = {
  categories: Category[];
};

export default function UploadScreen({ categories }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);
  const [isPrivate, setIsPrivate] = useState(false);

  const [selected, setSelected] = useState([] as Category[]);

  const filter = categories.filter(row => row.title.toLowerCase().includes(''.toLowerCase()));

  const handleSelect = async (row: Category) => {
    const found = selected.find(item => item.id === row.id);

    if (found) return setSelected(selected.filter(item => item.id !== row.id));

    return setSelected(prev => [...prev, row]);
  };

  const handleUpload = async () => {
    setMessage('Upload Iniciado!');

    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setMessage('Lendo o Arquivo!');

    const res = await axios.post('http://localhost:3030/cdn/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: e => {
        const percent = Math.round(e.loaded * 100) / e.total!;
        setProgress(parseInt(percent.toString()));
      },
    });

    setMessage('Upload finalizado com sucesso!');

    const result = await api.posts.create({
      ...res.data,
      isPrivate: price > 0,
      price: price,
      categories: selected
    });

    if (result.status !== 201) {
      return setMessage('Algo deu de errado ao salvar os dados!');
    }

    setMessage('Dados registrado com sucesso!');
  };

  return (
    <Container>
      <p color="#fff">{message}</p>
      <div style={{ height: 10 }} />

      <Form>
        <UploadStyled>
          {file ? (
            <>
              <MP4 height={80} />
              <SubContent>
                <div className="title">
                  <p>{file?.name}</p>
                  <p>{progress}%</p>
                </div>

                <div style={{ width: '100%', background: '#eee', height: 5, borderRadius: 5 }}>
                  <div
                    style={{ width: `${progress}%`, background: 'green', height: '100%' }}
                  />
                </div>
              </SubContent>
            </>
          ) : (
            <label htmlFor="upload-video">
              <Upload width={25} stroke="#6A42C2" strokeWidth={2} />
              Clique aqui para realizar um upload!
            </label>
          )}
        </UploadStyled>
        <div style={{ height: 10 }} />
        <Categories>
          <div>
            {filter.map((row, index) => {
              const find = !!selected.find(({ id }) => row.id === id);
              const variant = find ? "selected" : "select"

              return (
                <Button
                  type="button"
                  key={index}
                  variant={variant}
                  style={{ height: 40, margin: 2, flexGrow: 1 }}
                  onClick={() => handleSelect(row)}
                >
                  {row?.title.replace('_', ' ')}
                </Button>
              )
            })}
          </div>
        </Categories>
        <div style={{ height: 10 }} />
        <Input icon={Money} placeholder="price (optional*)" onChange={e => setPrice(Number(e.target.value))} />
      </Form>

      <input
        name="upload-video"
        id="upload-video"
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      {/* <Button variant="success" onClick={() => setIsPrivate(!isPrivate)}>{isPrivate ? 'yes' : 'no'}</Button> */}
      <Button onClick={handleUpload} disabled={!file}>Upload</Button>
    </Container>
  )
};