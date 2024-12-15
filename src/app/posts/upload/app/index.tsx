"use client";

import { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from "yup";

import { Tag, User, Collaborators } from '@svg';
import { Button, Input, Modal, Select } from "@common";
import { api, cloudinary } from "@services";
import { CategoryProps, CreatorProps } from "@global/interface";

import { Container, RightSide, Upload } from "./styles";
import { Register } from "../_components/register";

interface Props {
  creators: CreatorProps[];
  categories: CategoryProps[];
};

export const schema = yup.object({
  // file: yup.object({
  file: yup.string(),
  // }),
  creator: yup.object({
    id: yup.string(),
    label: yup.string(),
  }),
  collaborators: yup.object({
    id: yup.string(),
    label: yup.string(),
  }),
  categories: yup.object({
    id: yup.string(),
    label: yup.string(),
  }),
  // categories: yup.array().of(yup.string()),
});

export default function AppUpload({ creators = [], categories = [] }: Props) {
  const [add, setAdd] = useState(false);

  const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  const select = creators.map(row => ({
    id: row.id,
    label: row.name
  }));

  const category = categories.map(row => ({
    id: row.id,
    label: row.name
  }));

  const submit = async (data) => {
    const { width, height, url_pre_image, url_pre_video, url_video } = await cloudinary.upload(data.file, data.creator.id.split('-')[0]);

    await api.posts.create({
      creator_id: data.creator.id,
      categories: [data.categories.id],
      width,
      height,
      url_pre_image,
      url_pre_video,
      url_video,
    })
      .then(() => reset({
        file: '',
        categories: {},
        collaborators: {},
        creator: {}
      }))
  };

  return (
    <Container onSubmit={handleSubmit(submit)}>

      <Controller
        name="file"
        control={control}
        render={({ field: { value, onChange } }) =>
          <Upload>
            <label htmlFor="file">
              {value ? <video src={value} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6, opacity: isSubmitting ? .5 : 1 }} /> : 'Choose a file'}
            </label>
            <input
              style={{
                cursor: isSubmitting ? 'default' : 'pointer'
              }}
              // value={value}
              type="file"
              name="file"
              id="file"
              accept="video/mp4, video/webp"
              disabled={isSubmitting}
              onChange={evt => {
                const reader = new FileReader();

                reader.readAsDataURL(evt.target.files![0]);
                reader.onloadend = () => onChange(reader.result as string);
              }}
            />
          </Upload>
        }
      />

      <RightSide>
        <Controller
          name="creator"
          control={control}
          render={({ field: { value, onChange } }) =>
            <Select icon={User} width="medium" value={value ? value.label : ''} placeholder="creator" select={select} onChange={onChange} onNew={() => setAdd(true)} />
          }
        />

        <div style={{ height: 5 }} />

        <Controller
          name="collaborators"
          control={control}
          render={({ field: { value, onChange } }) =>
            <Select icon={Collaborators} width="medium" value={value ? value.label : ''} placeholder="collaborators (optional)" select={select} onChange={onChange} />
          }
        />

        <div style={{ height: 5 }} />

        <Controller
          name="categories"
          control={control}
          render={({ field: { value, onChange } }) =>
            <Select icon={Tag} width="medium" value={value ? value.label : ''} placeholder="categories" select={category} onChange={onChange} />
          }
        />
        <div style={{ height: 5 }} />

        <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>upload</Button>
      </RightSide>

      <Register open={add} setClose={setAdd} />

    </Container>
  )
};