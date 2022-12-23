import { DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/DropdownItem';

export interface DropdownProps {
  onChange: (...event: any[]) => void;

  options: string[];
  
  title: string;

  value: string;
}

export function Dropdown(props: DropdownProps) {
  const { onChange, options, title, value } = props;
  return (
    <DropdownButton title={ title }>
      { options.map((option: string) => <DropdownItem active={ option === value } onClick={onChange}></DropdownItem>) }
    </DropdownButton>
  );
}
