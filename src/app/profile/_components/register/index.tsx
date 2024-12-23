import { useState } from "react";

import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input, Modal, Button, Upload, Select, Tags } from "@common";
import { Collaborators, Description, Upload as UplaodSvg, Tag, Lock } from "@svg";
import { api, cloudinary } from "@services";

import { steps, schema, schemaProps } from "./constants";
import { NewCategory, Header, Div } from "./styles";
import { CategoryProps, UserProps } from "@global/interface";

type FieldName = keyof schemaProps;

type Props = {
  users: UserProps[];
  category: CategoryProps[]
};

export default function Register({ users, category }: Props) {
  const { control, handleSubmit, setValue, reset, trigger } = useForm({
    resolver: yupResolver(schema)
  });

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const select = users.map(r => ({
    id: r.id,
    label: r.nickname
  }));

  const user_select = users.map(r => ({
    id: r.id,
    name: r.nickname
  }));

  const processForm: SubmitHandler<schemaProps> = async (data: schemaProps) => {
    setLoading(true);

    try {
      const video = await cloudinary.upload(data.file, data.title.replaceAll(' ', '_'));

      await api.posts.create({
        title: data.title,
        description: data.description,
        categories: data.categories as CategoryProps[],
        cloudinary_video: JSON.stringify(video),
        hide: data.hide
      })
        .then(() => {
          reset({ file: '', categories: [], description: '', title: '', })
          setModal(false);
        })
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep === 1) return handleSubmit(processForm)();

    return setCurrentStep(step => step + 1);
  };

  return (
    <>
      <NewCategory onClick={() => setModal(true)}>
        <UplaodSvg width={25} height={25} stroke='white' strokeWidth={2} />
      </NewCategory>

      <Modal as="form" open={modal} onClickOutside={setModal} style={{ padding: '30px 25px', maxWidth: 450 }}>
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
                render={({ field: { onChange } }) =>
                  <Input icon={Description} placeholder="title" onChange={onChange} />
                }
              />
              <div style={{ width: 5 }} />
              <Tags icon={Tag} categories={category} onChange={evt => setValue('categories', evt)} />
            </Div>

            <div style={{ height: 10 }} />


            <Div>
              <Controller
                name="description"
                control={control}
                render={({ field: { onChange } }) =>
                  <Input icon={Description} placeholder="description" onChange={onChange} />
                }
              />
              <div style={{ width: 5 }} />
              <Tags icon={Lock} categories={user_select} onChange={evt => setValue('hide', evt)} />
            </Div>

            <div style={{ height: 10 }} />
            <Controller
              name="collaborators"
              control={control}
              render={({ field: { value, onChange } }) =>
                <Select icon={Collaborators} width="full" value={value ? value.label : ''} placeholder="collaborators (optional)" select={select} onChange={onChange} />
              }
            />

            <div style={{ height: 20 }} />
          </>
        )}

        <Button type="button" loading={loading} style={{ height: 40 }} onClick={next}>
          {currentStep === 0 ? 'next' : 'register'}
        </Button>
      </Modal>
    </>
  )
};
