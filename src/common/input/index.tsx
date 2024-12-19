import React from 'react';

import { useTheme } from 'styled-components';

import { Container } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  width?: 'small' | 'medium' | 'full';
};

export const Input: React.FC<InputProps> = ({ icon: Icon, width, ...rest }) => {
  const theme = useTheme();

  const styles = {
    width: width === 'small' ? 300 : width === 'medium' ? 400 : '100%'
  };

  return (
    <Container style={styles}>
      <span>
        <Icon width={21} height={21} stroke={theme.colors.primary} strokeWidth={2} />
      </span>

      <input id='input-main' placeholder='what?' {...rest} />
    </Container>
  )
}