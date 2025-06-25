import { format } from "@utils/format";
import * as yup from "yup";

export const schema = yup.object({
  file: yup
    .mixed()
    .required("O arquivo é obrigatório")
    .test("fileSize", "O vídeo deve ter no máximo 50MB", value => {
      return value && value[0] && value[0].size <= 50 * 1024 * 1024;
    })
    .test("fileType", "Apenas vídeos MP4 são permitidos", value => {
      return value && value[0] && value[0].type === "video/mp4";
    }),
  price: yup
    .string()
    .optional()
    .test('is-valid-currency', 'Preço inválido', (value) => {
      if (!value) return true;
      const parsed = format.parseCurrencyToFloat(value);
      return !isNaN(parsed) && parsed >= 0;
    }),
  categories: yup.array().of(
    yup.object({
      id: yup.string().required(),
      title: yup.string().required()
    })
  ).required("Categoria é obrigatório"),
  // url: yup.string().required(),
  // width: yup.number().required(),
  // height: yup.number().required(),
});

export type schemaProps = yup.InferType<typeof schema>;