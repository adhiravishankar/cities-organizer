import { observer } from 'mobx-react-lite';

import { FormsPage } from '../../layouts/FormsPage';
import { AppStore } from '../../stores/AppStore';

export interface AddNeighborhoodPageProps {
  store: AppStore;
}

export const AddNeighborhoodPage = observer<AddNeighborhoodPageProps>((props: AddNeighborhoodPageProps) => {
  return (
    <FormsPage title="Add Neighborhood">
      <div>Hello</div>
    </FormsPage>
  );
});
