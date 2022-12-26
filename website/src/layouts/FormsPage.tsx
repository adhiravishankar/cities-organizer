import { Fragment, PropsWithChildren } from 'react';
import { Card, Container, Row, Stack } from 'react-bootstrap';

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
      <Container>
        <Row>
          <Card>
            <Card.Header>
              <Card.Title>{ title }</Card.Title>
            </Card.Header>
            <Card.Body>
              <Stack gap={ 3 }>{ children }</Stack>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </Fragment>
  );
}
