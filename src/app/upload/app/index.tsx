"use client"

import { useState } from "react";

import axios from "axios";

import { Button } from "@common";

import { Container, Content, SubContent } from "./styles";
import api from "@services/api";
import { MP4, Upload } from "@svg";

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
      isPrivate
    });

    console.log(result);
  };

  return (
    <Container>
      {/* {message && <p>{message}</p>} */}

      <Content>
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
      </Content>

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