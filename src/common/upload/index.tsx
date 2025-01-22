import { FC, useState } from "react";

import { useTheme } from "styled-components";

import { Image as ImageSvg, Video } from "@svg";
import { formatBytes } from "@utils";

import { Container, Preview } from "./styles";

interface UploadProps {
  type: 'video' | 'image',
  value?: string;
  disable?: boolean;
  label: string;
  onChange: (a: string) => void
};

export const Upload: FC<UploadProps> = ({ type, value, disable, label, onChange }) => {
  const [file, setFile] = useState({
    file: {} as File,
    preview: null as string | null,
    status: '' as 'loading' | 'done'
  });

  const theme = useTheme();

  const handleFile = (evt) => {
    const reader = new FileReader();
    // if (evt.target.files![0].size >= bytes / Math.pow(1024, i)) {
    //   setFile({ file: {}, status: 'error' });
    // };

    reader.readAsDataURL(evt.target.files![0]);
    reader.onloadend = () => {
      setFile({ file: evt.target.files![0], preview: reader.result as string, status: 'done' });
      onChange(reader.result as string)
    };
  };

  return (
    <Container>
      <label
        htmlFor={`file-${type}`}
        style={{
          zIndex: 0,
          height: !value ? 200 : 'auto',
          alignItems: !value ? 'center' : 'start',
          // borderColor: file.status === 'error' ? 'red' : ''
        }}
      >

        {type === 'image' && !value && (
          <ImageSvg width={25} height={25} stroke={theme.colors.primary} strokeWidth={1.5} />
        )}

        {type === 'video' && !value && (
          <Video width={25} height={25} stroke={theme.colors.primary} strokeWidth={1.5} />
        )}

        {type === 'video' && value && (
          <Preview>
            <video autoPlay={false} style={{ opacity: disable ? .5 : 1 }}>
              <source src={file.preview ?? 'https://res.cloudinary.com/dyrtdrnky/video/upload/' + value} type='video/webm' />
            </video>
            <div className="preview-description">
              <h4>{file.file.name ?? value.split('/')[2]}</h4>
              <p>{formatBytes(file.file.size, 2)}</p>
            </div>
          </Preview>
        )}

        {type === 'image' && value && (
          <div className="preview">
            <img src={value} style={{ opacity: disable ? .5 : 1 }} />
            <div className="preview-description">
              <h4>{file.file.name}</h4>
              <p>{formatBytes(file.file.size, 2)}</p>
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
        accept={type === 'video' ? "video/*" : "image/*"}
        onChange={handleFile}
      />
    </Container>
  )
};