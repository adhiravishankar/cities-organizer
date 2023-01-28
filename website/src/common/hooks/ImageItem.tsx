
export interface ImageItemProps {
  source: string;

  name: string;
}

export const ImageItem = (image: ImageItemProps) => {
  const { name, source } = image;
  return <img src={ source } alt={ name } loading="lazy" className="image-item" />;
};