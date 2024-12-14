"use client";

import { useState } from "react";

import { Tag, User, Collaborators } from '@svg';

import { Container, RightSide, Upload } from "./styles";
import { Select } from "@common/select";
import { Button } from "@common/button";
import { CategoryProps, CreatorProps } from "@global/interface";
import { api } from "@services/api";

interface FileProps {
  preview: string;
};

interface Props {
  creators: CreatorProps[];
  categories: CategoryProps[];
};

export default function AppUpload({ creators = [], categories = [] }: Props) {
  const [file, setFile] = useState<FileProps | null>(null);
  const [data, setDate] = useState({
    creator: null as { id: string, label: string } | null,
    collaborators: null as { id: string, label: string } | null,
    category: null as { id: string, label: string } | null
  });

  const handleFile = (evt) => {
    const reader = new FileReader();

    reader.readAsDataURL(evt.target.files![0]);
    reader.onloadend = () => setFile({
      preview: reader.result as string
    });
  };

  const select = creators.map(row => ({
    id: row.id,
    label: row.name
  }));

  const category = categories.map(row => ({
    id: row.id,
    label: row.name
  }));

  const handleSubmit = async () => {
    await api.posts.create({
      creator_id: data.creator!.id,
      categories: [data.category]
    })
  };

  return (
    <Container>

      <Upload>
        <label htmlFor="file">
          {file ? <video src={file.preview} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6 }} /> : 'Choose a file'}
        </label>
        <input
          type="file"
          name="file"
          id="file"
          accept="video/mp4, video/webp"
          onChange={handleFile}
        />
      </Upload>

      <RightSide>
        <Select icon={User} width="medium" placeholder="creator" select={select} onChange={creator => setDate({ ...data, creator })} />
        <div style={{ height: 10 }} />

        <Select icon={Collaborators} width="medium" placeholder="collaborators (optional)" select={select} onChange={collaborators => setDate({ ...data, collaborators })} />
        <div style={{ height: 10 }} />

        <Select icon={Tag} width="medium" placeholder="categories" select={category} onChange={category => setDate({ ...data, category })} />
        <div style={{ height: 10 }} />

        <Button onClick={handleSubmit}>upload</Button>
      </RightSide>

    </Container>
  )
};