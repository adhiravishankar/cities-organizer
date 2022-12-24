import { observer } from 'mobx-react-lite';

import { LabeledImageItem } from '../../components/LabeledImageItem';
import { Metro } from '../../interfaces/Metro';
import { AppStore } from '../../stores/AppStore';

export interface MetroListProps {
  store: AppStore;
}

export const MetroList = observer<MetroListProps>((props: MetroListProps) => {
  const { store } = props;
  const metrosJSX: JSX.Element[] = [];
  store.metrosMap.forEach((metro: Metro) => {
    metrosJSX.push(<LabeledImageItem name={ metro.Name } source={ metro.FeaturedImage } />);
  });
  return <div>{ metrosJSX }</div>;
});
