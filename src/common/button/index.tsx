import React, { ButtonHTMLAttributes, CSSProperties } from 'react';
import { useTheme } from 'styled-components';

import { Container, Loading } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'select';
  selected?: boolean;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', selected, loading, style, ...rest }) => {
  const theme = useTheme();

  const styles = {
    primary: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.white,
      fontWeight: 600,
      width: 250,
      ...style
    } as CSSProperties,
    select: {
      backgroundColor: theme.colors[selected ? 'primary' : 'white'],
      color: theme.colors[selected ? 'white' : 'text'],
      fontWeight: 600,
      ...style
    } as CSSProperties
  };

  return (
    <Container style={styles[variant]} {...rest}>
      {
        loading ? (
          <Loading>
            <div className="lds-dual-ring"></div>
          </Loading>
        ) : children
      }
    </Container>
  )
};

export {
  Button,
  type ButtonProps
}