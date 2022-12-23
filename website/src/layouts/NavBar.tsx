import { useCallback } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

export interface NavBarProps {
  name: string;

  id?: number;

  editIcon: boolean;

  onEdit?: () => void;
}

export function NavBar(props: NavBarProps) {
  const { id, onEdit } = props;
  const onClick = useCallback(() => {
    onEdit();
  }, [onEdit, id]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Cities Organizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Nav className="nav-right">
            <Nav.Item><i className="fas fa-pen" /></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
