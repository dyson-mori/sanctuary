import { Lock } from "@svg";

import { PostProps } from "@global/interface";

import { Container, ButtonCard } from "./styles";

type LockedProps = {
  data: PostProps;
  onClick?: (data: PostProps) => void;
};

export default function Locked({ data }: LockedProps) {
  if (!data.isPrivate) {
    return null;
  };

  return (
    <Container>
      <Lock width={25} height={25} stroke='#fff' strokeWidth={2} />
      <p>R$ {data.price}</p>
    </Container>
  );
};

export function Clickable({ data, onClick }: LockedProps) {
  const style = {
    cursor: !!onClick ? 'pointer' : 'default'
  };

  const validation = () => {
    if (onClick) return onClick(data);
  };

  return <ButtonCard style={style} onClick={validation} />
};