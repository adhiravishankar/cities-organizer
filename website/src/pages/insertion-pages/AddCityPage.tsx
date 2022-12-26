import { FormsPage } from '../../layouts/FormsPage';
import { AppStore } from '../../stores/AppStore';

export interface AddCityPageProps {
  store: AppStore;
}

export function AddCityPage(props: AddCityPageProps) {
  return (
    <FormsPage title="Add City">
      'Add City'
    </FormsPage>
  );
}
