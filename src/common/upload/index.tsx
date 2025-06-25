import { forwardRef, useState } from "react";

import { Upload } from "@svg";

import { Container } from "./styles";

type UploadFileProps = {
  onChange: (file: FileList) => void;
};

export const UploadFile = forwardRef<HTMLInputElement, UploadFileProps>(({ onChange, ...rest }, ref) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (fileUrl) {
      URL.revokeObjectURL(fileUrl)
    };

    if (file) {
      const url = URL.createObjectURL(file);
      onChange(e.target.files!);
      setFileUrl(url);
    } else {
      setFileUrl(null);
    }
  };

  return (
    <Container>
      {fileUrl ? (
        <video
          style={{ objectFit: 'cover' }}
          preload="auto"
          muted
          loop
          playsInline
          controls
        >
          <source src={fileUrl} type="video/mp4" />
        </video>
      ) : (
        <label htmlFor="upload-video">
          <Upload width={25} stroke="#6A42C2" strokeWidth={2} />
          Clique aqui para realizar um upload!
        </label>
      )}
      <input
        ref={ref}
        {...rest}
        id="upload-video"
        type="file"
        accept="video/mp4"
        onChange={handleChange}
      />
    </Container>
  )
});

UploadFile.displayName = 'UploadFile';