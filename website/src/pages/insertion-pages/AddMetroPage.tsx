import { FormsPage } from '../../layouts/FormsPage';
import { AppStore } from '../../stores/AppStore';

export interface AddMetroPageProps {
  store: AppStore;
}

export function AddMetroPage(props: AddMetroPageProps) {
  return (
    <FormsPage title="Add Metro">
      'Add Metro'
    </FormsPage>
  );
}
