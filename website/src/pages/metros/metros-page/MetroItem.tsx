import { ImageListItem, ImageListItemBar } from '@mui/material';

import { Metro } from '../../../interfaces/Metro';



export const MetroItem = (metro: Metro) => {
  return (
    <ImageListItem key={metro.FeaturedImage}>
      <img
        src={metro.FeaturedImage}
        alt={metro.Name}
        loading="lazy"
      />
      <ImageListItemBar
        sx={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)' }}
        title={metro.Name}
        position="top"
        actionPosition="left"
      />
    </ImageListItem>
  );
};
