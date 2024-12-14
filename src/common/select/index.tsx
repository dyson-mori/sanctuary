import React, { CSSProperties, forwardRef, useRef, useState } from 'react';

import { useTheme } from 'styled-components';

import { useClickOutside } from '@hooks/useClickOutside';

import { Container, DropDown } from './styles';

interface SelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  width?: 'small' | 'medium' | 'full';
  onChange: (e: any) => void;
  defaultValue?: string;
  select: {
    id: string;
    label: string;
  }[];
};

export const Select: React.FC<SelectProps> = ({ icon: Icon, width, select, defaultValue, placeholder, onChange, ...rest }) => {
  const theme = useTheme();

  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const hideInputRef = useRef<HTMLInputElement>(null);

  const styles: CSSProperties = {
    minWidth: width === 'small' ? 300 : width === 'medium' ? 400 : '100%',
  };

  const filter = select.filter(row => row.label.toLowerCase().includes(search.toLowerCase()));

  useClickOutside(inputRef, () =>
    setOpen(false)
    // document.getElementById('dropdown')?.classList.remove('open')
  );

  function handleFocus() {
    setOpen(true)
    // document.getElementById('dropdown')?.classList.add('open');
  };

  const handleSelect = (select: { id: string, label: string }) => {
    if (inputRef.current && hideInputRef.current) {
      inputRef.current.value = select.label;
      hideInputRef.current.value = select.label;
      // hideInputRef.current.dispatchEvent(new Event("change"));
    };

    document.getElementById('dropdown')?.classList.remove('open');
    onChange(select);
  };

  return (
    <Container style={styles}>
      {/* {
        defaultValue && <span style={{ position: 'absolute', width: '100%', top: 0, bottom: 0, backgroundColor: 'transparent' }} />
      } */}
      <span>
        <Icon width={21} height={21} stroke={theme.colors.primary} strokeWidth={2} />
      </span>

      <input
        ref={inputRef}
        defaultValue={defaultValue}
        placeholder={placeholder ?? 'what?'}
        onFocus={handleFocus}
        onChange={e => setSearch(e.target.value)}
      />

      <input ref={hideInputRef} style={{ display: 'none' }} {...rest} />

      <DropDown id='dropdown' className={open ? 'open' : 'close'} style={styles}>
        {filter?.map((row, index) => (
          <button key={index} type='button' onClick={() => handleSelect(row)}>
            {row.label}
          </button>
        ))}
      </DropDown>
    </Container>
  )
}