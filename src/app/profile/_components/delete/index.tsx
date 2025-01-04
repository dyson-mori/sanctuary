import { useState } from "react";

import Image from "next/image";

import { Button, Modal } from "@common";
import { PostProps } from "@global/interface";
import { api } from "@services";

type Props = {
  data: PostProps | undefined;
  setClose: () => void;
};

export default function Delete({ data, setClose }: Props) {
  const [variant, setVariant] = useState<'primary' | 'loading' | 'error'>('primary');

  async function handleDelete() {
    setVariant('loading')
    await api.post.delete(data!.id)
      .then(setClose)
      .finally(() => setVariant('error'))
  };

  return (
    <Modal open={!!data} onClickOutside={setClose} style={{ padding: '30px 25px', maxWidth: 450 }}>
      <p>Do you want to delete this post?</p>
      <div style={{ height: 20 }} />
      <Image src={'https://res.cloudinary.com/dyrtdrnky/video/upload/' + data?.pre_image} width={400} height={400} alt="ksoa" style={{ objectFit: 'cover' }} />
      <div style={{ height: 20 }} />
      <Button onClick={handleDelete} variant={variant}>yes</Button>
    </Modal>
  )
};
