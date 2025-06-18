"use client"

import { useState } from "react";

import axios from "axios";

import { Button } from "@common";

import { Container } from "./styles";
import api from "@services/api";

export default function UploadScreen() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

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
      isPrivate,
      price: 12.50,
      categories: [
        { id: "cmc29i6em0002boa4r4xbmby4" },
        { id: "cmc29i6en0005boa4x024xsjq" },
        { id: "cmc29i6en0007boa4awgspj7i" },
        { id: "cmc29i6en000gboa4qm05m5em" },
      ]
    });

    console.log(result);
  };

  return (
    <Container>
      <div style={{ marginTop: 10 }}>
        <div style={{ width: 500, background: '#eee', height: 10 }}>
          <div
            style={{
              width: `${progress}%`,
              background: 'green',
              height: '100%',
            }}
          />
        </div>
        <p>{progress}%</p>
      </div>

      {message && <p>{message}</p>}

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      <Button variant="success" onClick={() => setIsPrivate(!isPrivate)}>{isPrivate ? 'yes' : 'no'}</Button>
      <Button onClick={handleUpload} disabled={!file}>Upload</Button>
    </Container>
  )
};