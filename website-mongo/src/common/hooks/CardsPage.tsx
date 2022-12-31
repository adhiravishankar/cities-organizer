import { Fragment, PropsWithChildren, ReactNode } from 'react';
import { Card, Col, Container, Row, Stack } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import { AddPics, AddPicsProps } from './AddPics';
import { Breadcrumbs, BreadcrumbsProps } from './Breadcrumbs';
import { NavBar, NavBarProps } from './NavBar';

export interface CardsPageProps {
  breadcrumbs: BreadcrumbsProps;

  notes: string;

  editModal: ReactNode;

  addPicsProps: AddPicsProps;

  navBarProps: NavBarProps;
}

export function CardsPage(props: PropsWithChildren<CardsPageProps>) {
  const { addPicsProps, breadcrumbs, children, editModal, navBarProps, notes } = props;
  return (
    <Fragment>
      <NavBar { ...navBarProps } />
      <Container className="body-container">
        <Row>
          <Col>
            <Stack direction="vertical" gap={3}>
              <Breadcrumbs { ...breadcrumbs } />
              { children }
              <Card>
                <Card.Header><Card.Title>Notes</Card.Title></Card.Header>
                <Card.Body>
                  <ReactMarkdown>{ notes }</ReactMarkdown>
                </Card.Body>
              </Card>
            </Stack>
          </Col>
        </Row>
      </Container>
      { editModal }
      <AddPics { ...addPicsProps } />
    </Fragment>
  );
}
