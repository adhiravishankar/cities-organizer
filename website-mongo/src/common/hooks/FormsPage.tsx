import { Fragment, PropsWithChildren } from 'react';
import { Card, Col, Container, Row, Stack } from 'react-bootstrap';

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
            <Card>
              <Card.Header>
                <Card.Title>{ title }</Card.Title>
              </Card.Header>
              <Card.Body>
                <Stack gap={ 3 }>{ children }</Stack>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
