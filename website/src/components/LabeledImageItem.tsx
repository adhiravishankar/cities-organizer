import { ImageListItem, ImageListItemBar } from '@mui/material';

export interface LabeledImageItemProps {
  source: string;

  name: string;
}


export const LabeledImageItem = (image: LabeledImageItemProps) => {
  const { name, source } = image;
  return (
    <ImageListItem key={ name }>
      <img
        src={ source }
        alt={ name }
        loading="lazy"
      />
      <ImageListItemBar
        sx={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)' }}
        title={ name }
        position="top"
        actionPosition="left"
      />
    </ImageListItem>
  );
};
