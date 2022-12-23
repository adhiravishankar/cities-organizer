
export interface LabeledImageItemProps {
  source: string;

  name: string;
}


export const LabeledImageItem = (image: LabeledImageItemProps) => {
  const { name, source } = image;
  return (
    <div key={ name }>
      <img src={ source } alt={ name } loading="lazy" />
      <div className="image-label" title={ name } />
    </div>
  );
};
