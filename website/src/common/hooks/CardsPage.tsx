import { Card, CardContent } from '@mui/material';
import { Fragment, PropsWithChildren, ReactNode } from 'react';
import { Col, Container, Row, Stack } from 'react-bootstrap';
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
                <CardContent>
                  <div><h6>Notes</h6></div>
                  <ReactMarkdown>{ notes }</ReactMarkdown>
                </CardContent>
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
