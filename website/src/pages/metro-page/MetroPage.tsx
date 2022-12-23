import { observer } from 'mobx-react-lite';
import { CSSProperties, Fragment, useCallback } from 'react';
import { Container, Modal  } from 'react-bootstrap';
import { useParams } from 'react-router';

import { ImagesCard } from '../../components/ImagesCard';
import { Metro } from '../../interfaces/Metro';
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
  const metro = store.metrosMap.get(Number.parseInt(params.metro));

  const openEditingScreen = useCallback(() => {
    store.modalOpen = true;
  }, [store]);

  const editMetro = useCallback((newMetro: Metro) => {
    store.editMetro(newMetro.ID, newMetro.Name, newMetro.ExtendedName, newMetro.Population);
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
      <Modal show={ true || store.modalOpen }>
        <EditMetro metro={ metro } editMetro={ editMetro } pics={ store.pics } />
      </Modal>
      <Modal open={ store.imagesUploadModalOpen }>
        <AddPics fileUpload={ fileUpload } />
      </Modal>
    </Fragment>
  );
});
