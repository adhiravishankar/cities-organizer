import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import {redirect, useNavigate} from 'react-router';

import { LabeledImageItem } from '../../components/LabeledImageItem';
import { Metro } from '../../interfaces/Metro';
import { AppStore } from '../../stores/AppStore';

export interface MetroListProps {
  store: AppStore;
}

export const MetroList = observer<MetroListProps>((props: MetroListProps) => {
  const { store } = props;
  const metrosJSX: JSX.Element[] = [];
  const navigation = useNavigate();

  const onClickHandler = useCallback((id: number) => navigation('/metros/' + id), []);

  store.metrosMap.forEach((metro: Metro) => {
    const { ID, FeaturedImage, Name } = metro;
    metrosJSX.push(<LabeledImageItem onClick={ onClickHandler } id={ ID } name={ Name } source={ FeaturedImage } />);
  });
  return <div>{ metrosJSX }</div>;
});
