import { Card, Row, Stack } from 'react-bootstrap';

import { ImageItem } from './ImageItem';

export interface ImagesCardProps {
  errorMessage: string;

  openAddPics: ()  => void;

  pics: string[];
}

export function ImagesCard(props: ImagesCardProps) {
  const { errorMessage, pics } = props;
  const imagesJSX: JSX.Element[] = [];
  if (pics === null || pics === undefined) {
    imagesJSX.push(<span>{ errorMessage }</span>);
  } else {
    pics.forEach((pic: string) => imagesJSX.push(<ImageItem key={pic} source={pic} name={pic}/>));
  }
  return (
    <Row>
      <Card className="images-card">
        <Card.Header>
          <Card.Title>Images</Card.Title>
          <div className="card-add" onClick={ props.openAddPics }><i className="fas fa-plus" /></div>
        </Card.Header>
        <Card.Body>
          <Stack className="images-stack" gap={1} direction="horizontal">
            { imagesJSX }
          </Stack>
        </Card.Body>
      </Card>
    </Row>
  );
}