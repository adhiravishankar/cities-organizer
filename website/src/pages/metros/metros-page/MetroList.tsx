import { ImageList } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { Metro } from '../../../interfaces/Metro';
import { AppStore } from '../../../stores/AppStore';
import { MetroItem } from './MetroItem';

export interface MetroListProps {
  store: AppStore;
}

export const MetroList = observer<MetroListProps>((props: MetroListProps) => {
  const metrosJSX: JSX.Element[] = [];
  props.store.metrosMap.forEach((metro: Metro) => {
    metrosJSX.push(<MetroItem { ...metro } />);
  });
  return <ImageList cols={ 3 }>{ metrosJSX }</ImageList>;
});
