import { Card, CardContent } from '@mui/material';
import { Stack } from 'react-bootstrap';

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
    <Card className="images-card">
      <CardContent>
        <div className="card-actions-header">
          <h6>Images</h6>
          <div className="card-add" onClick={ props.openAddPics }><i className="fas fa-plus" /></div>
        </div>
        <Stack className="images-stack" gap={1} direction="horizontal">
          { imagesJSX.length === 0 ? 'No images attached' : imagesJSX }
        </Stack>
      </CardContent>
    </Card>
  );
}