import { useCallback } from 'react';
import { DropdownButton } from 'react-bootstrap';

import { DropdownOption } from './DropdownOption';

interface DropdownProps {
  onChange: (...event: any[]) => void;

  options: Map<number, string>;

  title: string;

  value: number;
}

export function DropdownNumberMap(props: DropdownProps) {
  const { onChange, options, title, value } = props;
  const onClickHandler = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>, newValue: string) => onChange(newValue), [onChange]);
  const jsxElements = [];
  options.forEach((option: string, optionIndex: number) =>
    jsxElements.push(<DropdownOption value={ optionIndex } text={ option } active={ optionIndex === value } onClick={ onClickHandler } />));
  return (
    <DropdownButton title={ title }>
      { jsxElements }
    </DropdownButton>
  );
}
