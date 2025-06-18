import React, { CSSProperties, ReactNode, useRef, forwardRef } from "react";
import { useClickOutside } from "@hooks";

import { Container, Content } from "./styles";

interface Props {
  as?: 'form';
  open: boolean;
  onClickOutside?: (b: boolean) => void;
  children: ReactNode;
  style?: CSSProperties;
  onSubmit?: () => void;
}

const Modal = forwardRef<HTMLDivElement, Props>(
  ({ open, onClickOutside, children, ...rest }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null);

    const contentStyle: CSSProperties = {
      visibility: open ? 'visible' : 'hidden',
      opacity: open ? 1 : 0,
    };

    useClickOutside(contentRef, () => {
      if (onClickOutside) {
        onClickOutside(false);
      }
    });

    return (
      <Container style={contentStyle} ref={ref}>
        <Content ref={contentRef} {...rest}>
          {children}
        </Content>
      </Container>
    );
  }
);

Modal.displayName = "Modal"

export { Modal }