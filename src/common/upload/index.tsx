import { FC, useState } from "react";
import { Image as ImageSvg, Video } from "@svg";

import { Container } from "./styles";
import { useTheme } from "styled-components";
import { formatBytes } from "@utils";

interface UploadProps {
  type: 'video' | 'image',
  value: string;
  disable: boolean;
  label: string;
  onChange: (a: string) => void
};

export const Upload: FC<UploadProps> = ({ type, value, disable, label, onChange }) => {
  const [file, setFile] = useState({} as File);
  const theme = useTheme();

  const handleFile = (evt) => {
    const reader = new FileReader();

    setFile(evt.target.files![0])

    reader.readAsDataURL(evt.target.files![0]);
    reader.onloadend = () => onChange(reader.result as string);
  };

  return (
    <Container>
      <label
        htmlFor={`file-${type}`}
        style={{
          zIndex: 0,
          height: !value ? 200 : 'auto',
          alignItems: !value ? 'center' : 'start',
        }}
      >

        {type === 'image' && !value && (
          <ImageSvg width={25} height={25} stroke={theme.colors.primary} strokeWidth={1.5} />
        )}

        {type === 'video' && !value && (
          <Video width={25} height={25} stroke={theme.colors.primary} strokeWidth={1.5} />
        )}

        {type === 'video' && value && (
          <div className="preview">
            <video src={value} style={{ opacity: disable ? .5 : 1 }} />
            <div className="preview-description">
              <h4>{file.name}</h4>
              <p>{formatBytes(file.size, 2)}</p>
            </div>
          </div>
        )}

        {type === 'image' && value && (
          <div className="preview">
            <img src={value} style={{ opacity: disable ? .5 : 1 }} />
            <div className="preview-description">
              <h4>{file.name}</h4>
              <p>{formatBytes(file.size, 2)}</p>
            </div>
          </div>
        )}

        {!value && label}

      </label>
      <input
        style={{
          cursor: disable ? 'default' : 'pointer'
        }}
        type={`file`}
        name={`file-${type}`}
        id={`file-${type}`}
        accept={type === 'video' ? "video/mp4, video/webp" : "image/*"}
        onChange={handleFile}
      />
    </Container>
  )
};