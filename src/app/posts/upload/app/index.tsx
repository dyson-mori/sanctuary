"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from "yup";

import { User, Collaborators } from '@svg';
import { Button, Input, Modal, Select, Tags } from "@common";
import { api, cloudinary } from "@services";
import { CategoryProps, CreatorProps } from "@global/interface";

import { Container, Div, RightSide, Upload } from "./styles";

interface Props {
  creators: CreatorProps[];
  categories: CategoryProps[];
};

export const schema = yup.object({
  file: yup.string().required(),
  creator: yup.object({
    id: yup.string().required(),
    label: yup.string().required(),
  }),
  collaborators: yup.object({
    id: yup.string(),
    label: yup.string(),
  }),
  categories: yup.array().of(
    yup.object({
      id: yup.string().required(),
      name: yup.string().required()
    })
  ),
});

type schemaProps = yup.InferType<typeof schema>;

export default function AppUpload({ creators = [], categories = [] }: Props) {
  const { control, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  const select = creators.map(row => ({
    id: row.id,
    label: row.name
  }));

  const submit = async (data: schemaProps) => {
    const { width, height, url_pre_image, url_pre_video, url_video } = await cloudinary.upload(data.file, data.creator.id.split('-')[0]);

    await api.posts.create({
      creator_id: data.creator.id,
      categories: data.categories!,
      width,
      height,
      url_pre_image,
      url_pre_video,
      url_video,
    })
      .then(() => reset({
        file: '',
        categories: [],
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
        <Div>
          <Controller
            name="creator"
            control={control}
            render={({ field: { value, onChange } }) =>
              <Select icon={User} width="full" value={value ? value.label : ''} placeholder="creator" select={select} onChange={onChange} />
            }
          />
          <div style={{ width: 5 }} />
          <Tags categories={categories} onChange={evt => setValue('categories', evt)} />
        </Div>

        <div style={{ height: 5 }} />

        <Controller
          name="collaborators"
          control={control}
          render={({ field: { value, onChange } }) =>
            <Select icon={Collaborators} width="full" value={value ? value.label : ''} placeholder="collaborators (optional)" select={select} onChange={onChange} />
          }
        />

        <div style={{ height: 5 }} />

        <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>upload</Button>
      </RightSide>

    </Container>
  )
};