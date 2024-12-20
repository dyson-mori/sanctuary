import { CSSProperties, FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "styled-components";

import { Check, Link } from "@svg";

import { Container } from "./styles";

interface Props {
  show: boolean;
  url?: string;
};

export const Notification: FC<Props> = ({ show, url }) => {
  const [open, setOpen] = useState(show);

  const theme = useTheme();
  const route = useRouter();

  const styles: CSSProperties = {
    bottom: show ? 20 : -200
  };

  function handleLink() {
    route.push('')
  };

  return (
    <Container style={styles}>
      <Check width={25} height={25} stroke={theme.colors.success} strokeWidth={2} />
      <div>
        <h4>Success</h4>
        <p>Post completed successfully</p>
      </div>
      {url && <button onClick={handleLink}>
        <Link width={20} height={20} stroke={theme.colors.text} strokeWidth={1} />
      </button>}
    </Container>
  )
};