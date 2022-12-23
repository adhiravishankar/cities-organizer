
export interface ImageItemProps {
  source: string;

  name: string;
}

export const ImageItem = (image: ImageItemProps) => {
  const { name, source } = image;
  return (
    <div key={ name }>
      <img
        src={ source }
        alt={ name }
        loading="lazy"
      />
    </div>
  );
};