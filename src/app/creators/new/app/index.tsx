"use client";
import { useState } from "react";

import { useTheme } from "styled-components";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from "yup";

import { ArrowLeft, ArrowRight, Tag, User, Upload as UplaodStyled, Description } from "@svg";
import { CategoryProps } from "@global/interface";
import { api, cloudinary } from "@services";
import { Input, Proccess, Select } from "@common";

import { Container, Content, Footer, Form, Upload } from "./styles";
import { steps } from "./constants";

interface Props {
  categories: CategoryProps[];
};

export const schema = yup.object({
  file_video: yup.string(),
  file_image: yup.string(),
  name: yup.string(),
  description: yup.string(),
  categories: yup.string(),
});

type schemaProps = yup.InferType<typeof schema>;
type FieldName = keyof schemaProps;

export default function AppUpload({ categories = [] }: Props) {
  const { control, handleSubmit, trigger, formState: { isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  const [currentStep, setCurrentStep] = useState(0);

  const theme = useTheme();

  const category = categories.map(row => ({
    id: row.id,
    label: row.name
  }));

  const processForm: SubmitHandler<schemaProps> = async (data: schemaProps) => {
    try {
      const video = await cloudinary.upload(data.file_video!, data.name!, "creator");
      const image = await cloudinary.uploadImage(data.file_image!, data.name!, "creator");

      await api.creator.create({
        width: video.width,
        height: video.height,
        social_media: '',
        url_pre_video: video.url_pre_video,
        name: data.name!,
        photo: image.url_pre_image,
        description: data.description!,
      })

    } catch (error) {
      console.log(error);
    }
  };

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep === 2) return handleSubmit(processForm)();

    return setCurrentStep(step => step <= 2 ? step + 1 : 2);
  };

  return (
    <Container>

      <Proccess step={currentStep} />

      <Content>

        {currentStep === 0 && <Controller
          name="file_video"
          control={control}
          render={({ field: { value, onChange } }) =>
            <Upload>
              <label htmlFor="file" style={{ zIndex: 0 }}>
                {value ? <video src={value} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6, opacity: isSubmitting ? .5 : 1 }} /> : 'Choose a Video'}
              </label>
              <input
                style={{
                  cursor: isSubmitting ? 'default' : 'pointer'
                }}
                type="file"
                name="file"
                id="file"
                accept="video/mp4, video/webp"
                onChange={evt => {
                  const reader = new FileReader();

                  reader.readAsDataURL(evt.target.files![0]);
                  reader.onloadend = () => onChange(reader.result as string);
                }}
              />
            </Upload>
          }
        />}

        {currentStep === 1 && <Controller
          name="file_image"
          control={control}
          render={({ field: { value, onChange } }) =>
            <Upload>
              <label htmlFor="file" style={{ zIndex: 5 }}>
                {value ? <img src={value} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6, opacity: isSubmitting ? .5 : 1 }} /> : 'Choose a Image'}
              </label>
              <input
                style={{
                  cursor: isSubmitting ? 'default' : 'pointer'
                }}
                type="file"
                name="file"
                id="file"
                accept="image/*"
                onChange={evt => {
                  const reader = new FileReader();

                  reader.readAsDataURL(evt.target.files![0]);
                  reader.onloadend = () => onChange(reader.result as string);
                }}
              />
            </Upload>
          }
        />}

        {currentStep === 2 && (
          <Form>
            <Controller
              name="name"
              control={control}
              render={({ field: { value, onChange } }) =>
                <Input icon={User} placeholder="name" onChange={onChange} />
              }
            />
            <div style={{ height: 10 }} />
            <Controller
              name="description"
              control={control}
              render={({ field: { value, onChange } }) =>
                <Input icon={Description} placeholder="description" onChange={onChange} />
              }
            />
            <div style={{ height: 10 }} />
            <Controller
              name="categories"
              control={control}
              render={({ field: { value, onChange } }) =>
                <Select icon={Tag} placeholder="categories" onChange={console.log} select={category} />
              }
            />
          </Form>
        )}
      </Content>

      <Footer>
        <button
          type="button"
          disabled={currentStep === 0}
          style={{
            opacity: currentStep === 0 ? 0 : 1,
            cursor: currentStep === 0 ? 'default' : 'pointer'
          }}
          onClick={evt => {
            setCurrentStep(step => step === 2 ? step - 1 : 0)
          }}
        >
          <ArrowRight width={15} height={15} stroke={theme.colors.text} strokeWidth={2} />
          back
        </button>
        <button type="button" onClick={next}>
          {currentStep === 2 ? 'Upload' : 'next'}
          {currentStep === 2 ? (
            <UplaodStyled width={15} height={15} stroke={theme.colors.text} strokeWidth={2} />
          ) : (
            <ArrowLeft width={15} height={15} stroke={theme.colors.text} strokeWidth={2} />
          )}
        </button>
      </Footer>

    </Container>
  )
};