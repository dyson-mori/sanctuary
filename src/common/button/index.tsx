import React, { ButtonHTMLAttributes, forwardRef } from 'react';

import { Container, Loading } from './styles';

export type Variant = 'primary' | 'select' | 'selected' | 'error';

type ButtonProps = {
  variant?: Variant;
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const loading_css = (
  <Loading>
    <div className="lds-dual-ring"></div>
  </Loading>
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, variant = 'primary', children, ...rest }, ref) => (
    <Container ref={ref} variant={variant} disabled={loading} {...rest}>
      {loading ? loading_css : children}
    </Container>
  )
);

Button.displayName = 'Button';
