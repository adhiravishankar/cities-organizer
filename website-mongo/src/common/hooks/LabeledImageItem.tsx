import { useCallback } from 'react';

import { NoImageItem } from './NoImageItem';

export interface LabeledImageItemProps {
  source?: string;

  onClick: (id: string) => void;

  name: string;

  id: string;
}


export const LabeledImageItem = (image: LabeledImageItemProps) => {
  const { id, name, onClick, source } = image;
  const onClickHandler = useCallback(() => onClick(id), [id, onClick]);
  if (source === null || source === undefined || source === '' || source === 'undefined')
    return <NoImageItem name={ name } onClick={ onClickHandler } />;


  return (
    <div key={ name } className="labeled-image-item" onClick={ onClickHandler }>
      <img src={ source } alt={ name } loading="lazy" />
      <div className="image-label" title={ name } />
    </div>
  );
};
