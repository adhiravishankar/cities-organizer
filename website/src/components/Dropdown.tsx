import { useCallback } from 'react';
import { DropdownButton } from 'react-bootstrap';

import { DropdownOption } from './DropdownOption';

export interface DropdownProps {
  onChange: (...event: any[]) => void;

  options: string[];
  
  title: string;

  value: string;
}

export function Dropdown(props: DropdownProps) {
  const { onChange, options, title, value } = props;
  const onClickHandler = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>, newValue: string) => onChange(newValue), [onChange]);
  return (
    <DropdownButton title={ title }>
      { options.map((option: string) => <DropdownOption value={ option } active={ option.localeCompare(value) === 0 } onClick={ onClickHandler } />) }
    </DropdownButton>
  );
}
