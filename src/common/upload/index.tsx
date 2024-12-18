import { FC } from "react";
import { Container } from "./styles";

interface UploadProps {
  type: 'video' | 'image',
  value: string;
  disable: boolean;
  label: string;
  onChange: (a: string) => void
};

export const Upload: FC<UploadProps> = ({ type, value, disable, label, onChange }) => {
  const handleFile = (evt) => {
    const reader = new FileReader();

    reader.readAsDataURL(evt.target.files![0]);
    reader.onloadend = () => onChange(reader.result as string);
  };

  const image = <img src={value} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6, opacity: disable ? .5 : 1 }} />;
  const video = <video src={value} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6, opacity: disable ? .5 : 1 }} />;

  return (
    <Container>
      <label htmlFor="file" style={{ zIndex: 0 }}>
        {value && type === 'video' ? video : value && type === 'image' ? image : label}
      </label>
      <input
        style={{
          cursor: disable ? 'default' : 'pointer'
        }}
        type="file"
        name="file"
        id="file"
        accept={type === 'video' ? "video/mp4, video/webp" : "image/*"}
        onChange={handleFile}
      />
    </Container>
  )
};