import { useEffect, useState } from "react";

import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input, Modal, Button, Upload, Tags } from "@common";
import { Description, Upload as UplaodSvg, Tag, Lock, Text } from "@svg";
import { api } from "@services";

import { steps, schema, schemaProps } from "./constants";
import { NewCategory, Header, Div } from "./styles";
import { CategoryProps, PostProps, UserProps } from "@global/interface";

type FieldName = keyof schemaProps;

type Props = {
  modal: {
    post: PostProps | undefined;
    modal: boolean;
  };
  onClick: (modal: boolean, post: PostProps | undefined) => void;
  users: UserProps[];
  category: CategoryProps[];
};

export default function Register({ modal, users, category, onClick }: Props) {
  const { control, handleSubmit, setValue, reset, trigger } = useForm({
    resolver: yupResolver(schema)
  });

  const [variant, setVariant] = useState<'primary' | 'loading' | 'error'>('primary');
  const [currentStep, setCurrentStep] = useState(0);

  const categories = category.map(r => ({
    id: r.id,
    name: r.name,
    selected: !!modal.post?.categories?.find(cat => cat.id === r.id)
  }));

  const users_options = users.map(r => ({
    id: r.id,
    name: r.nickname,
    selected: !!modal.post?.private?.find(cat => cat.user.id === r.id)
  }));

  const processForm: SubmitHandler<schemaProps> = async (data: schemaProps) => {
    setVariant('loading');

    if (modal.post?.id) {
      return await api.post.update(modal.post.id, {
        file: data.file,
        title: data.title,
        description: data.description,
        categories: data.categories as CategoryProps[],
        // @ts-expect-error: ignore
        private: data.private
      }).then(() => {
        reset({ file: '', categories: [], description: '', title: '', })
        onClick(false, {} as PostProps);
        setVariant('primary');
      })
        .catch(err => alert(err))
    };

    await api.post.create({
      file: data.file,
      title: data.title,
      description: data.description,
      categories: data.categories as CategoryProps[],
      // @ts-expect-error: ignore
      private: data.private
    })
      .then(() => {
        reset({ file: '', categories: [], description: '', title: '', })
        onClick(false, {} as PostProps);
        setVariant('primary');
      })
      .catch(err => {
        alert(err)
        setVariant('error');
      })
  };

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep === 1) return handleSubmit(processForm)();

    return setCurrentStep(step => step + 1);
  };

  const handlePrivate = (evt: { id: string, name: string }[]) => {
    const build = evt.map(row => ({
      user: {
        id: row.id,
        name: row.name
      }
    }));
    setValue('private', build)
  };

  useEffect(() => {
    setCurrentStep(0);
    setValue('file', modal.post?.pre_video ?? '');
    setValue('title', modal.post?.title ?? '');
    setValue('description', modal.post?.description ?? '');
    setValue('categories', modal.post?.categories ?? []);
    // @ts-expect-error: ignore
    setValue('private', modal.post?.private ?? []);
  }, [modal.modal]);

  return (
    <>
      <NewCategory onClick={() => onClick(true, undefined)}>
        <UplaodSvg width={25} height={25} stroke='white' strokeWidth={2} />
      </NewCategory>

      <Modal as="form" open={modal.modal} onClickOutside={evt => onClick(evt, undefined)} style={{ padding: '30px 25px', maxWidth: 450 }}>
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
              <Upload type="video" label='Choose a Video' value={value} onChange={onChange} disable={false} />
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
          {currentStep === 0 ? 'next' : modal.post?.id ? 'update' : 'register'}
        </Button>
      </Modal>
    </>
  )
};
