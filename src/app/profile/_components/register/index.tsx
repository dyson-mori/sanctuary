import { useEffect, useState } from "react";

import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { api, cloudinary } from "@services";
import { Input, Modal, Button, Upload, Tags } from "@common";
import { Description, Upload as UplaodSvg, Tag, Lock, Text } from "@svg";

import { CategoryProps, PostProps, UserProps } from "@global/interface";

import { steps, schema, schemaProps } from "./constants";
import { NewCategory, Header, Div } from "./styles";

type FieldName = keyof schemaProps;

type Props = {
  post?: PostProps;
  users: UserProps[];
  category: CategoryProps[];
  onClick: (post?: PostProps) => void;
};

export default function Register({ post, users, category, onClick }: Props) {
  const { control, handleSubmit, setValue, reset, trigger } = useForm({
    resolver: yupResolver(schema)
  });

  const [modal, setModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [variant, setVariant] = useState<'primary' | 'loading' | 'error'>('primary');

  const categories = category.map(r => ({
    id: r.id,
    name: r.name,
    selected: !!post?.categories?.find(cat => cat.id === r.id)
  }));

  const users_options = users.map(r => ({
    id: r.id,
    name: r.nickname,
    selected: !!post?.private?.find(cat => cat.user.id === r.id)
  }));

  function handleCloseModal() {
    onClick(undefined);
    setModal(false);
  };

  const processForm: SubmitHandler<schemaProps> = async (data: schemaProps) => {
    setVariant('loading');

    let prefix = {} as PostProps;

    if (post?.id) {
      if (post.pre_video !== data.file) {
        await cloudinary.destroy(post.public_id, 'video');
        prefix = await cloudinary.upload(data.file, data.title.replaceAll(' ', '_'));
      };

      return await api.post.update(post.id, {
        width: prefix.width,
        height: prefix.height,
        pre_image: prefix.pre_image,
        pre_video: prefix.pre_video,
        url_video: prefix.url_video,
        public_id: prefix.public_id,

        title: data.title,
        description: data.description,
        categories: data.categories as CategoryProps[],
        // @ts-expect-error: ignore
        private: data.private
      }).then(() => {
        handleCloseModal()
        setVariant('primary');
      })
        .catch(() => setVariant('error'))
    };

    const video = await cloudinary.upload(data.file, data.title.replaceAll(' ', '_'));

    await api.post.create({
      width: video.width,
      height: video.height,
      pre_image: video.pre_image,
      pre_video: video.pre_video,
      url_video: video.url_video,
      public_id: video.public_id,

      title: data.title,
      description: data.description,
      categories: data.categories as CategoryProps[],
      // @ts-expect-error: ignore
      private: data.private
    })
      .then(() => {
        reset({ file: '', categories: [], description: '', title: '', })
        handleCloseModal()
        setVariant('primary');
      })
      .catch(() => setVariant('error'))
  };

  async function next() {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep === 1) return handleSubmit(processForm)();

    return setCurrentStep(step => step + 1);
  };

  function handlePrivate(evt: { id: string, name: string }[]) {
    const build = evt.map(row => ({
      user: {
        id: row.id,
        name: row.name
      }
    }));
    setValue('private', build)
  };

  function handleClose() {
    handleCloseModal();
    setModal(false);
  };

  useEffect(() => {
    setCurrentStep(0);
    setValue('file', post?.pre_video ?? '');
    setValue('title', post?.title ?? '');
    setValue('description', post?.description ?? '');
    setValue('categories', post?.categories ?? []);
    // @ts-expect-error: ignore
    setValue('private', post?.private ?? []);
  }, [post?.id]);

  return (
    <>
      <NewCategory onClick={() => setModal(true)}>
        <UplaodSvg width={25} height={25} stroke='white' strokeWidth={2} />
      </NewCategory>

      <Modal as="form" open={!!post?.id || modal} onClickOutside={handleClose} style={{ padding: '30px 25px', maxWidth: 450 }}>
        <Header>
          <UplaodSvg width={25} height={25} strokeWidth={2} />
          <div className="label">
            <h4>{steps[currentStep].title}</h4>
            <p>{steps[currentStep].description}</p>
          </div>
        </Header>

        {currentStep === 0 && (
          <Controller
            name="file"
            control={control}
            render={({ field: { value, onChange } }) =>
              <Upload type="video" label='maximum limit of ?? mb' value={value} onChange={onChange} disable={false} />
            }
          />
        )}

        {currentStep === 1 && (
          <>
            <Div>
              <Controller
                name="title"
                control={control}
                render={({ field: { value, onChange } }) =>
                  <Input icon={Text} defaultValue={value} placeholder="title" onChange={onChange} />
                }
              />
              <div style={{ width: 5 }} />
              <Tags icon={Tag} options={categories} onChange={evt => setValue('categories', evt)} />
            </Div>

            <div style={{ height: 10 }} />

            <Div>
              <Controller
                name="description"
                control={control}
                render={({ field: { value, onChange } }) =>
                  <Input icon={Description} defaultValue={value} placeholder="description" onChange={onChange} />
                }
              />
              <div style={{ width: 5 }} />
              <Tags icon={Lock} options={users_options} onChange={handlePrivate} />
            </Div>
          </>
        )}

        <Button type="button" variant={variant} style={{ height: 40 }} onClick={next}>
          {currentStep === 0 ? 'next' : post?.id ? 'update' : 'register'}
        </Button>
      </Modal>
    </>
  )
};
