import React, { ButtonHTMLAttributes, CSSProperties } from 'react';

import { Container, Loading } from './styles';
import theme from '../../global/theme';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  // secondary?: boolean | string;
  width?: 50 | 200 | 400 | 600;
  color?: keyof typeof theme.colors;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, width = 200, color = 'primary', loading, ...rest }) => {
  const styles: CSSProperties = {
    width,
    backgroundColor: theme.colors[color],
    color: '#fff',
    fontWeight: 600
  };

  return (
    <Container style={styles} {...rest}>
      {/* {
        loading ? (
          <Loading>
            <div />
            <div />
            <div />
          </Loading>
        ) : children
      } */}
      {children}
    </Container>
  )
};

export {
  Button,
  type ButtonProps
}