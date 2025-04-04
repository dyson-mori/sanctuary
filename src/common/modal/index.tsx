import { CSSProperties, FC, ReactNode, useRef } from "react";

import { Container, Content } from "./styles";
import { useClickOutside } from "@hooks";

interface Props {
  as?: 'form',
  open: boolean;
  onClickOutside?: (b: boolean) => void;
  children: ReactNode;
  style?: CSSProperties;
  onSubmit?: () => void;
};

export const Modal: FC<Props> = ({ open, onClickOutside, children, ...rest }) => {
  const contentRef = useRef(null);

  const content_style: CSSProperties = {
    visibility: open ? 'visible' : 'hidden',
    opacity: open ? 1 : 0,
  };

  useClickOutside(contentRef, () => {
    if (!!onClickOutside) {
      onClickOutside(false)
    }
  });

  return (
    <Container style={content_style}>
      <Content ref={contentRef} {...rest}>
        {children}
      </Content>
    </Container>
  )
};