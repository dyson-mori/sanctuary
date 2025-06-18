import React, { forwardRef, InputHTMLAttributes } from 'react';

import { Container } from './styles';

type Variant = 'primary' | 'select' | 'selected' | 'error' | 'loading';

type InputProps = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  variant?: Variant;
  buttonIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon: Icon, variant = 'primary', buttonIcon: ButtonIcon, ...rest }, ref) => (
    <Container variant={variant}>
      <span>
        <Icon width={21} height={21} strokeWidth={2} />
      </span>
      <input ref={ref} {...rest} />
      {ButtonIcon && (
        <button>
          <ButtonIcon width={21} height={21} strokeWidth={2} />
        </button>
      )}
    </Container>
  )
);

Input.displayName = 'Input';

export { Input }