import { ImageListItem } from '@mui/material';

export interface ImageItemProps {
  source: string;

  name: string;
}

export const ImageItem = (image: ImageItemProps) => {
  const { name, source } = image;
  return (
    <ImageListItem key={ name }>
      <img
        src={ source }
        alt={ name }
        loading="lazy"
      />
    </ImageListItem>
  );
};