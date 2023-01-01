import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Fragment, PropsWithChildren } from 'react';
import { Col, Container, Row, Stack } from 'react-bootstrap';

import { Breadcrumbs } from './Breadcrumbs';
import { NavBar } from './NavBar';

interface Props {
  title: string;
}

export type FormsPageProps = PropsWithChildren<Props>;

export function FormsPage(props: FormsPageProps) {
  const { children, title } = props;
  return (
    <Fragment>
      <NavBar editIcon={ false } name={ title } />
      <Container className="body-container">
        <Row>
          <Col>
            <Breadcrumbs active="insertion" insertionText={ title } />
            <Card>
              <CardContent>
                <h1>{ title }</h1>
                <Stack gap={ 3 }>{ children }</Stack>
              </CardContent>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
