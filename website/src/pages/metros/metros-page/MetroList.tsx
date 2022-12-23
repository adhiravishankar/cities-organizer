import { observer } from 'mobx-react-lite';

import { Metro } from '../../../interfaces/Metro';
import { AppStore } from '../../../stores/AppStore';
import { LabeledImageItem } from '../../../components/LabeledImageItem';

export interface MetroListProps {
  store: AppStore;
}

export const MetroList = observer<MetroListProps>((props: MetroListProps) => {
  const { store } = props;
  const metrosJSX: JSX.Element[] = [];
  store.metrosMap.forEach((metro: Metro) => {
    metrosJSX.push(<LabeledImageItem name={ metro.Name } source={ metro.FeaturedImage } />);
  });
  return <ImageList cols={ 3 }>{ metrosJSX }</ImageList>;
});
