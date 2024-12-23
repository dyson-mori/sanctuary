import * as yup from "yup";

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

export type schemaProps = yup.InferType<typeof schema>;
