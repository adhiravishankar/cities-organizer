import { Fragment, useCallback } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router';

export interface NavBarProps {
  name: string;

  id?: string;

  editIcon: boolean;

  onEdit?: () => void;
}

export function NavBar(props: NavBarProps) {
  const { editIcon, id, name, onEdit } = props;

  const navigation = useNavigate();

  const onClickEditIcon = useCallback(() => {
    onEdit();
  }, [onEdit, id]);

  const onAddMetro = useCallback(() => navigation('/add-metro'), []);
  const onAddCity = useCallback(() => navigation('/add-city'), []);
  const onAddNeighborhood = useCallback(() => navigation('/add-neighborhood'), []);

  const plusIconJSX = (
    <Fragment>
      <i className="fas fa-plus" />
      Add
    </Fragment>
  );
  const editIconJSX = editIcon ? <Nav.Item onClick={ onClickEditIcon }><i className="fas fa-pen" /></Nav.Item> : null;

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>{ name }</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          <Nav className="nav-right">
            <NavDropdown title={ plusIconJSX }>
              <NavDropdown.Item onClick={ onAddMetro }>Metro</NavDropdown.Item>
              <NavDropdown.Item onClick={ onAddCity }>City</NavDropdown.Item>
              <NavDropdown.Item onClick={ onAddNeighborhood }>Neighborhood</NavDropdown.Item>
            </NavDropdown>
            { editIconJSX }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
