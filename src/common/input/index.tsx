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

  // function handleEye() {
  //   const eye = document.getElementById('eye');
  //   const eye_slash = document.getElementById('eye-slash');
  //   const input = document.getElementById('input-main');

  //   input?.setAttribute('type', 'text')

  //   if (eye!.classList[0] === 'hide') {
  //     eye!.classList.replace('hide', 'show');
  //     eye_slash!.classList.replace('show', 'hide');
  //   } else {
  //     eye!.classList.replace('show', 'hide');
  //     eye_slash!.classList.replace('hide', 'show');
  //     rest.type = 'password';
  //   };
  // };

  return (
    <Container style={styles}>
      <span>
        <Icon width={21} height={21} stroke={theme.colors.primary} strokeWidth={2} />
      </span>

      <input id='input-main' placeholder='what?' {...rest} />

      {/* {rest.type === 'password' && (
        <button onClick={handleEye}>
          <Eye id='eye' className='hide' width={21} height={21} stroke={theme.colors.primary} strokeWidth={2} />
          <EyeSlash id='eye-slash' className='show' width={21} height={21} stroke={theme.colors.primary} strokeWidth={2} />
        </button>
      )} */}
    </Container>
  )
}