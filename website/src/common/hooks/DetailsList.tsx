import { Fragment } from 'react';
import { Col, Row } from 'react-bootstrap';

export interface DetailsListProps {
  data: Map<string, string>;
}

export function DetailsList(props: DetailsListProps) {
  const list: JSX.Element[] = [];
  props.data.forEach((value: string, key: string) => {
    const detail = (
      <Row>
        <Col>{ key }</Col>
        <Col>{ value }</Col>
      </Row>
    );
    list.push(detail);
  });

  return <Fragment>{ list }</Fragment>;
}
