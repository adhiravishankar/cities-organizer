import { useCallback } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

export interface NavBarProps {
  name: string;

  id?: number;

  editIcon: boolean;

  onEdit?: () => void;
}

export function NavBar(props: NavBarProps) {
  const { id, name, onEdit } = props;
  const onClick = useCallback(() => {
    onEdit();
  }, [onEdit, id]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>{ name }</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav className="nav-right">
            <Nav.Item onClick={ onClick }><i className="fas fa-pen" /></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
