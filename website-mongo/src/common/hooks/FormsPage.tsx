import { Fragment, PropsWithChildren } from 'react';
import { Col, Container, Row, Stack } from 'react-bootstrap';

import { NavBar } from './NavBar';
import {Card, CardContent, CardHeader, Typography} from "@mui/material";

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
