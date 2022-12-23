import { Card, Row, Stack } from 'react-bootstrap';

import { ImageItem } from './ImageItem';

export interface ImagesCardProps {
  pics: string[];
}

export function ImagesCard(props: ImagesCardProps) {
  return (
    <Row>
      <Card className="images-card">
        <Card.Title>Images</Card.Title>
        <Card.Text>
          <Stack className="images-stack" gap={1} direction="horizontal">
            { props.pics.map((pic: string) => <ImageItem source={ pic } name={ pic } />) }
          </Stack>
        </Card.Text>
      </Card>
    </Row>
  );
}