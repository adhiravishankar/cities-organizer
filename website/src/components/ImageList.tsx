import { Queue } from 'queue-typescript';
import { Col, Row } from 'react-bootstrap';


export interface ImageListProps {
  children: JSX.Element[];

  columns: number;
}

export type ColumnList = JSX.Element[];

export function ImageList(props: ImageListProps) {
  const { children, columns } = props;

  const imageList = new Queue<JSX.Element>(...children);
  const listOfColumns: ColumnList[] = [];
  for (let idx = 0; idx < columns; idx++) {
    const column: ColumnList = [];
    listOfColumns.push(column);
  }

  let currentColumn = 0;
  while (imageList.length > 0) {
    listOfColumns[currentColumn].push(imageList.removeHead());
    currentColumn++;
    if (currentColumn >= columns) {
      currentColumn = 0;
    }
  }

  const columnsJSX = listOfColumns.map((columnList: ColumnList) => <Col>{ columnList }</Col>);
  return <Row>{ columnsJSX }</Row>;
}
