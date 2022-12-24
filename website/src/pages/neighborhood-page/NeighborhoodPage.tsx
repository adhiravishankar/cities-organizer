import { observer } from 'mobx-react-lite';
import { Fragment, useCallback } from 'react';
import { Container, Stack } from 'react-bootstrap';

import { AddPics } from '../../components/AddPics';
import { ImagesCard } from '../../components/ImagesCard';
import { NavBar } from '../../layouts/NavBar';
import { AppStore } from '../../stores/AppStore';
import { EditNeighborhood } from './EditNeighborhood';

interface NeighborhoodProps {
  store: AppStore;
}

export const NeighborhoodPage = observer<NeighborhoodProps>((props: NeighborhoodProps) => {
  const { store } = props;
  const { selectedNeighborhood } = store;

  const openEditingScreen = useCallback(() => {
    store.editingModalVisibilityChange(true);
  }, [store]);

  const openUploadPicsScreen = useCallback(() => {
    store.uploadPicsModalVisibilityChange(true);
  }, [store]);

  const closeUploadPicsScreen = useCallback(() => {
    store.uploadPicsModalVisibilityChange(false);
  }, [store]);

  const fileUpload = useCallback((file: File) => {
    store.uploadPicForMetro(selectedNeighborhood.ID, file);
  }, [store, selectedNeighborhood]);

  return (
    <Fragment>
      <NavBar editIcon={ true } id={ selectedNeighborhood.ID } onEdit={ openEditingScreen } name={ selectedNeighborhood.Name } />
      <Container className="cities-container">
        <Stack direction="vertical" gap={3}>
          <ImagesCard
            errorMessage="No images are currently attached."
            openAddPics={ openUploadPicsScreen }
            pics={ store.pics }
          />
        </Stack>
      </Container>
      <EditNeighborhood id={ selectedNeighborhood.ID } store={ store } />
      <AddPics onCloseModal={ closeUploadPicsScreen } shown={ store.uploadPicsModalOpen } fileUpload={ fileUpload } />
    </Fragment>
  );
});
