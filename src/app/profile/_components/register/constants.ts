import * as yup from "yup";

export const steps = [
  {
    // id: 'clyp5g9v30000y4iwb6dw4wfn',
    id: 0,
    title: 'Upload Files',
    description: 'select the video for the creators cover',
    fields: [
      'file_video'
    ]
  },
  {
    // id: 'clyp6mut5000ay4iw0rcg2vve',
    id: 1,
    title: 'Form',
    description: 'follow what is requested in the fields below',
    fields: [
      'name',
      'description',
      // 'media'
    ]
  }
];

export const schema = yup.object({
  file: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
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
  hide: yup.array().of(
    yup.object({
      id: yup.string().required(),
      name: yup.string().required()
    })
  ),
});

export type schemaProps = yup.InferType<typeof schema>;