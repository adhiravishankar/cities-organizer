import { useCallback } from 'react';
import { Card, Row, Stack } from 'react-bootstrap';

import { LabeledImage } from '../interfaces/Base';
import { LabeledImageItem } from './LabeledImageItem';

export interface LabeledImagesCardProps {
  name: string;

  errorMessage: string;

  onClick: (id: number) => void;
  
  items: LabeledImage[];
}

export function LabeledImagesCard(props: LabeledImagesCardProps) {
  const { errorMessage, items, name, onClick } = props;

  const onClickHandler = useCallback((id: number) => {
    onClick(id);
  }, [onClick]);

  const itemsJSX = (items === null || items === undefined) ? <span>{ errorMessage }</span> : (
    <Stack className="images-stack" gap={1} direction="horizontal">
      { items.map((image: LabeledImage) => <LabeledImageItem id={ image.id } onClick={ onClickHandler } source={ image.source } name={ image.label } />) }
    </Stack>
  );

  return (
    <Row>
      <Card className="images-card">
        <Card.Title>{ name }</Card.Title>
        <Card.Text>{ itemsJSX }</Card.Text>
      </Card>
    </Row>
  );
}