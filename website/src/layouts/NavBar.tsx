import { useCallback } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

export interface NavBarProps {
  name: string;

  id?: number;

  editIcon: boolean;

  onEdit?: () => void;
}

export function NavBar(props: NavBarProps) {
  const { editIcon, id, name, onEdit } = props;
  const onClick = useCallback(() => {
    onEdit();
  }, [onEdit, id]);

  const editIconJSX = editIcon ? <Nav.Item onClick={ onClick }><i className="fas fa-pen" /></Nav.Item> : null;

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>{ name }</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          <Nav className="nav-right">
            { editIconJSX }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
