import React, { CSSProperties, useRef, useState } from 'react';

import { useTheme } from 'styled-components';

import { useClickOutside } from '@hooks';

import { Container, DropDown } from './styles';
import { Add } from '@svg';

interface SelectProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  width?: 'small' | 'medium' | 'full';
  onChange: (e: { id: string }) => void;
  placeholder: string;
  defaultValue?: string;
  value?: string;
  onNew?: () => void;
  select: {
    id: string;
    label: string;
  }[];
};

export const Select: React.FC<SelectProps> = ({ icon: Icon, width, select, defaultValue, value, placeholder, onNew, onChange, ...rest }) => {
  const theme = useTheme();

  const [search, setSearch] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hideInputRef = useRef<HTMLInputElement>(null);

  const styles: CSSProperties = {
    minWidth: width === 'small' ? 300 : width === 'medium' ? 400 : '100%',
  };

  const filter = select.filter(row => row.label.toLowerCase().includes(search.toLowerCase()));

  useClickOutside(containerRef, () =>
    dropRef.current?.classList.remove('open')
  );

  function handleFocus() {
    dropRef.current?.classList.add('open')
  };

  const handleSelect = (select: { id: string, label: string }) => {
    if (inputRef.current && hideInputRef.current) {
      inputRef.current.value = select.label;
      hideInputRef.current.value = select.label;
      // hideInputRef.current.dispatchEvent(new Event("change"));
    };
    document.getElementById('dropdown')?.classList.remove('open');
    onChange(select);
    dropRef.current?.classList.remove('open');
  };

  return (
    <Container ref={containerRef} style={styles}>
      {/* {
        defaultValue && <span style={{ position: 'absolute', width: '100%', top: 0, bottom: 0, backgroundColor: 'transparent' }} />
      } */}
      <span>
        <Icon width={21} height={21} stroke={theme.colors.primary} strokeWidth={2} />
      </span>

      <input
        ref={inputRef}
        value={value ?? ''}
        defaultValue={defaultValue}
        placeholder={placeholder ?? 'what?'}
        onFocus={handleFocus}
        onChange={e => setSearch(e.target.value)}
      />

      {onNew && <button type='button' onClick={onNew}>
        <Add width={21} height={21} stroke={theme.colors.primary} strokeWidth={2} />
      </button>}

      <input ref={hideInputRef} style={{ display: 'none' }} {...rest} />

      <DropDown ref={dropRef} style={styles}>
        {filter?.map((row, index) => (
          <button key={index} type='button' onClick={() => handleSelect(row)}>
            {row.label}
          </button>
        ))}
      </DropDown>
    </Container>
  )
}