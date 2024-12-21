"use client";
import { useEffect, useState } from "react";

import { useTheme } from "styled-components";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from "yup";

import { User, Upload as UplaodSvg, Description } from "@svg";
import { CategoryProps } from "@global/interface";
import { api, cloudinary } from "@services";
import { Button, Input, Notification, Upload } from "@common";

import { Container, Content } from "./styles";
import { steps } from "./constants";

interface Props {
  categories: CategoryProps[];
};

export const schema = yup.object({
  file_video: yup.string().required(),
  // file_video: yup.string().required(),
  file_image: yup.string().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  categories: yup.string(),
});

type schemaProps = yup.InferType<typeof schema>;
type FieldName = keyof schemaProps;

export default function AppUpload({ }: Props) {
  const { control, handleSubmit, trigger } = useForm({
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
        public_id: JSON.stringify({
          public_image_id: image.public_id,
          public_video_id: video.public_id,
        })
      }).then(() => setNotification(true))

    } catch (error) {
      console.log(error);
    }
  };

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep === 1) return handleSubmit(processForm)();

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

      <Content>

        <div className="header">
          <UplaodSvg width={25} height={25} stroke={theme.colors.primary} strokeWidth={2} />
          <div className="label">
            <h4>{steps[currentStep].title}</h4>
            <p>{steps[currentStep].description}</p>
          </div>
        </div>


        {currentStep === 0 && (
          <>
            <Controller
              name="file_video"
              control={control}
              render={({ field: { value, onChange } }) =>
                <Upload type="video" label='Choose a Video' value={value} onChange={onChange} disable={false} />
              }
            />

            <Controller
              name="file_image"
              control={control}
              render={({ field: { value, onChange } }) =>
                <Upload type="image" label='Choose a Image' value={value} onChange={onChange} disable={false} />
              }
            />
          </>
        )}

        {currentStep === 1 && (
          <>
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
            <div style={{ height: 10 }} />
            {/* <Controller
              name="description"
              control={control}
              render={({ field: { onChange } }) =>
                <Input icon={Link} placeholder="social media" onChange={onChange} />
              }
            />
            <div style={{ height: 10 }} /> */}
          </>
        )}

        <Button type="button" style={{ height: 40 }} onClick={next}>{currentStep === 0 ? 'next' : 'register'}</Button>
      </Content>

      <Notification show={notification} />

    </Container>
  )
};