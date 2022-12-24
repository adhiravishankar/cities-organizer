import { observer } from 'mobx-react-lite';
import { Fragment, useCallback } from 'react';
import { Container, Modal, Stack } from 'react-bootstrap';
import { useParams } from 'react-router';

import { ImagesCard } from '../../components/ImagesCard';
import { LabeledImagesCard } from '../../components/LabeledImagesCard';
import { LabeledImage } from '../../interfaces/Base';
import { City } from '../../interfaces/City';
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
  const { metrosMap, selectedMetro } = store;
  const params = useParams<MetroParams>();
  const metroID = Number.parseInt(params.metro);
  const metro = metrosMap.get(metroID);

  const openEditingScreen = useCallback(() => {
    store.editingModalVisibilityChange(true);
  }, [store]);

  const fileUpload = useCallback((file: File) => {
    store.uploadPicForMetro(metro.ID, file);
  }, [store, metro]);

  const images: LabeledImage[] = (selectedMetro.Cities === null || selectedMetro.Cities === undefined) ? null :
    selectedMetro.Cities
      .map<LabeledImage>((city: City) => { return { id: city.ID, label: city.Name, source: city.FeaturedImage }; });

  return (
    <Fragment>
      <NavBar editIcon={ true } id={ metro.ID } onEdit={ openEditingScreen } name={ metro.Name } />
      <Container className="cities-container">
        <Stack direction="vertical" gap={3}>
          <ImagesCard pics={ store.pics } />
          <LabeledImagesCard errorMessage="No cities in this metro currently." name="Cities" onClick={ null } items={ images } />
          <LabeledImagesCard errorMessage="No neighborhoods in this metro currently." name="Neighborhoods" onClick={ null } items={ null } />
        </Stack>
      </Container>
      <EditMetro id={ metroID } store={ store } />
      <Modal open={ store.imagesUploadModalOpen }>
        <AddPics fileUpload={ fileUpload } />
      </Modal>
    </Fragment>
  );
});
