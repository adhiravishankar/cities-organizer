import { Card, CardContent } from '@mui/material';
import { useCallback } from 'react';
import { Stack } from 'react-bootstrap';

import { LabeledImage } from '../interfaces/LabeledImage';
import { LabeledImageItem } from './LabeledImageItem';

export interface LabeledImagesCardProps {
  name: string;

  errorMessage: string;

  onClick: (id: string) => void;

  items: LabeledImage[];
}

export function LabeledImagesCard(props: LabeledImagesCardProps) {
  const { errorMessage, items, name, onClick } = props;

  const onClickHandler = useCallback((id: string) => {
    onClick(id);
  }, [onClick]);


  const itemsJSX = (items === null || items === undefined) ? <span>{ errorMessage }</span> : (
    <Stack className="images-stack" gap={1} direction="horizontal">
      { items.map((image: LabeledImage) => <LabeledImageItem id={ image.ID } onClick={ onClickHandler } source={ image.Source } name={ image.Label } />) }
    </Stack>
  );

  return (
    <Card className="images-card">
      <CardContent>
        <div className="card-actions-header">
          <h6>{ name }</h6>
        </div>
        { itemsJSX }
      </CardContent>
    </Card>
  );
}