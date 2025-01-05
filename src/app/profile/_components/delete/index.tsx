import { useState } from "react";

import Image from "next/image";

import { api } from "@services";
import { Button, Modal } from "@common";
import { PostProps } from "@global/interface";

type Props = {
  data?: PostProps;
  setClose: (data?: PostProps) => void;
};

export default function Delete({ data, setClose }: Props) {
  const [variant, setVariant] = useState<'primary' | 'loading' | 'error'>('primary');

  async function handleDelete() {
    setVariant('loading');

    await api.post.delete(data!.id)
      .then(handleCloseModal)
      .catch(() => setVariant('error'))
      .finally(() => setVariant('primary'))
  };

  function handleCloseModal() {
    setClose(undefined);
  };

  return (
    <Modal open={!!data} onClickOutside={handleCloseModal} style={{ padding: '30px 25px', maxWidth: 450 }}>
      <p>Do you want to delete this post?</p>
      <div style={{ height: 20 }} />
      <Image src={'https://res.cloudinary.com/dyrtdrnky/video/upload/' + data?.pre_image} width={400} height={400} alt="ksoa" style={{ objectFit: 'cover' }} />
      <div style={{ height: 20 }} />
      <Button onClick={handleDelete} variant={variant}>yes</Button>
    </Modal>
  )
};
