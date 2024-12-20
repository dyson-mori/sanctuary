"use client";
import { useEffect, useState } from "react";

import { useTheme } from "styled-components";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from "yup";

import { ArrowLeft, ArrowRight, User, Upload as UplaodStyled, Description } from "@svg";
import { CategoryProps } from "@global/interface";
import { api, cloudinary } from "@services";
import { Input, Notification, Proccess, Upload } from "@common";

import { Container, Content, Footer, Form } from "./styles";
import { steps } from "./constants";

interface Props {
  categories: CategoryProps[];
};

export const schema = yup.object({
  file_video: yup.string().required(),
  file_image: yup.string().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  categories: yup.string(),
});

type schemaProps = yup.InferType<typeof schema>;
type FieldName = keyof schemaProps;

export default function AppUpload({ }: Props) {
  const { control, handleSubmit, trigger, formState: { isSubmitting, isValid, isDirty } } = useForm({
    resolver: yupResolver(schema)
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [notification, setNotification] = useState(false);

  const theme = useTheme();

  const processForm: SubmitHandler<schemaProps> = async (data: schemaProps) => {
    // setMessage('enviando');

    try {
      const video = await cloudinary.upload(data.file_video!, data.name!, "creator");

      if (video.public_id) {
        // setMessage('video salvo com sucesso');
      };

      const image = await cloudinary.uploadImage(data.file_image!, data.name!, "creator");

      if (image.public_id) {
        // setMessage('image salva com sucesso');
      };

      await api.creator.create({
        width: video.width,
        height: video.height,
        social_media: '',
        url_pre_video: video.url_pre_video,
        name: data.name!,
        photo: image.url_pre_image,
        description: data.description!,
      }).then(() => setNotification(true))

    } catch (error) {
      console.log(error);
    }
  };

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep === 2) return handleSubmit(processForm)();

    return setCurrentStep(step => step + 1);
  };

  useEffect(() => {
    if (!notification) return;

    setNotification(true);

    setTimeout(() => {
      setNotification(false);
    }, 2000);
  }, [notification]);

  return (
    <Container>

      <Proccess step={currentStep} />
      <Content>
        {currentStep === 0 && <Controller
          name="file_video"
          control={control}
          render={({ field: { value, onChange } }) =>
            <Upload type="video" label='Choose a Video' value={value} onChange={onChange} disable={false} />
          }
        />}

        {currentStep === 1 && <Controller
          name="file_image"
          control={control}
          render={({ field: { value, onChange } }) =>
            <Upload type="image" label='Choose a Image' value={value} onChange={onChange} disable={false} />
          }
        />}

        {currentStep === 2 && (
          <Form>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange } }) =>
                <Input icon={User} placeholder="name" onChange={onChange} />
              }
            />
            <div style={{ height: 10 }} />
            <Controller
              name="description"
              control={control}
              render={({ field: { onChange } }) =>
                <Input icon={Description} placeholder="description" onChange={onChange} />
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
          onClick={() => {
            setCurrentStep(step => step === 2 ? step - 1 : 0)
          }}
        >
          <ArrowRight width={15} height={15} stroke={theme.colors.text} strokeWidth={2} />
          back
        </button>

        {/* <p>{message}</p> */}

        <button
          style={{
            opacity: (isSubmitting || currentStep === 2 && !isValid && !isDirty) ? .5 : 1,
            cursor: (isSubmitting || currentStep === 2 && !isValid && !isDirty) ? 'default' : 'pointer'
          }}
          disabled={
            isSubmitting || currentStep === 2 && !isValid && !isDirty
          }
          type="button"
          onClick={next}
        >
          {currentStep === 2 ? 'Upload' : 'next'}
          {currentStep === 2 ? (
            <UplaodStyled width={15} height={15} stroke={theme.colors.text} strokeWidth={2} />
          ) : (
            <ArrowLeft width={15} height={15} stroke={theme.colors.text} strokeWidth={2} />
          )}
        </button>
      </Footer>

      <Notification show={notification} />

    </Container>
  )
};