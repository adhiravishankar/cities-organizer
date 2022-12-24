import { useCallback } from 'react';

import { NoImageItem } from './NoImageItem';

export interface LabeledImageItemProps {
  source?: string;

  onClick: (id: number) => void;

  name: string;

  id: number;
}


export const LabeledImageItem = (image: LabeledImageItemProps) => {
  const { id, name, onClick, source } = image;
  const onClickHandler = useCallback(() => onClick(id), [id, onClick]);
  if (source === null || source === undefined || source === '')
    return <NoImageItem name={ name } onClick={ onClickHandler } />;


  return (
    <div key={ name } className="labeled-image-item" onClick={ onClickHandler }>
      <img src={ source } alt={ name } loading="lazy" />
      <div className="image-label" title={ name } />
    </div>
  );
};
