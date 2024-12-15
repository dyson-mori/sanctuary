import { CSSProperties, FC, ReactNode, useRef } from "react";

import { Container, Content } from "./styles";
import { useClickOutside } from "@hooks";

interface Props {
  open: boolean;
  onClickOutside: (b: boolean) => void;
  children: ReactNode;
  style?: CSSProperties;
};

export const Modal: FC<Props> = ({ open, onClickOutside, children, style }) => {
  const contentRef = useRef(null);

  const content_style: CSSProperties = {
    visibility: open ? 'visible' : 'hidden',
    opacity: open ? 1 : 0,
  };

  useClickOutside(contentRef, () => onClickOutside(false));

  return (
    <Container style={content_style}>
      <Content style={style} ref={contentRef}>
        {children}
      </Content>
    </Container>
  )
};