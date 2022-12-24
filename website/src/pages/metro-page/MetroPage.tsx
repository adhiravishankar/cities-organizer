import { observer } from 'mobx-react-lite';
import { Fragment, useCallback } from 'react';
import { Container, Modal  } from 'react-bootstrap';
import { useParams } from 'react-router';

import { ImagesCard } from '../../components/ImagesCard';
import { NavBar } from '../../layouts/NavBar';
import { AppStore } from '../../stores/AppStore';
import { AddPics } from './AddPics';
import { EditMetro } from './EditMetro';

type MetroParams = {
  metro: string;
};

interface MetroProps {
  store: AppStore;
}

export const MetroPage = observer<MetroProps>((props: MetroProps) => {
  const { store } = props;
  const params = useParams<MetroParams>();
  const metroID = Number.parseInt(params.metro);
  const metro = store.metrosMap.get(metroID);

  const openEditingScreen = useCallback(() => {
    store.editingModalVisibilityChange(true);
  }, [store]);

  const fileUpload = useCallback((file: File) => {
    store.uploadPicForMetro(metro.ID, file);
  }, [store, metro]);

  return (
    <Fragment>
      <NavBar editIcon={ true } id={ metro.ID } onEdit={ openEditingScreen } name={ metro.Name } />
      <Container className="cities-container">
        <ImagesCard pics={ store.pics } />
      </Container>
      <EditMetro id={ metroID } store={ store } />
      <Modal open={ store.imagesUploadModalOpen }>
        <AddPics fileUpload={ fileUpload } />
      </Modal>
    </Fragment>
  );
});
