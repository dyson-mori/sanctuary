import { CSSProperties, FC, useEffect, useRef } from "react";

import { Container, Content } from "./styles";
import { useClickOutside } from "@hooks/useClickOutside";

interface Props {
  open: boolean;
  onClickOutside: () => void;
  children: any;
  style?: CSSProperties;
};

export const Modal: FC<Props> = ({ open, onClickOutside, children, style }) => {
  const contentRef = useRef(null);

  const content_style: CSSProperties = {
    visibility: open ? 'visible' : 'hidden',
    opacity: open ? 1 : 0,
  };

  useClickOutside(contentRef, onClickOutside);

  return (
    <Container style={content_style}>
      <Content style={style} ref={contentRef}>
        {children}
      </Content>
    </Container>
  )
};