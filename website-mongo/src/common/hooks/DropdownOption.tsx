import { useCallback } from 'react';
import DropdownItem from 'react-bootstrap/DropdownItem';

export interface DropdownOptionProps {
  value: string;

  text: string;

  active: boolean;

  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => void;
}

export function DropdownOption(props: DropdownOptionProps) {
  const { value, onClick, text } = props;
  const onClickHandler = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => onClick(event, value),
    [value, onClick]);
  return <DropdownItem active={ props.active } onClick={onClickHandler}>{ text }</DropdownItem>;
}
