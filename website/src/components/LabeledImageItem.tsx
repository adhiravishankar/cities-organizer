import {NoImageItem} from "./NoImageItem";

export interface LabeledImageItemProps {
  source?: string;

  name: string;
}


export const LabeledImageItem = (image: LabeledImageItemProps) => {
  const { name, source } = image;
  if (source === null || source === undefined || source === '') return <NoImageItem name={ name } />;
  return (
    <div key={ name } className="labeled-image-item">
      <img src={ source } alt={ name } loading="lazy" />
      <div className="image-label" title={ name } />
    </div>
  );
};
