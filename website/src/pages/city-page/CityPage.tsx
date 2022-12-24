import { observer } from 'mobx-react-lite';
import { Fragment, useCallback } from 'react';
import { Container, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import { AddPics } from '../../components/AddPics';
import { ImagesCard } from '../../components/ImagesCard';
import { LabeledImagesCard } from '../../components/LabeledImagesCard';
import { LabeledImage } from '../../interfaces/Base';
import { Neighborhood } from '../../interfaces/Neighborhood';
import { Breadcrumbs } from '../../layouts/Breadcrumbs';
import { NavBar } from '../../layouts/NavBar';
import { AppStore } from '../../stores/AppStore';
import { EditCity } from './EditCity';

interface CityProps {
  store: AppStore;
}

export const CityPage = observer<CityProps>((props: CityProps) => {
  const { store } = props;
  const { selectedCity } = store;
  const navigation = useNavigate();

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
    store.uploadPicForCity(selectedCity.ID, file);
  }, [store, selectedCity]);

  const onNeighborhoodClick = useCallback((id: number) => {
    navigation('/neighborhoods/' + id);
  }, []);


  const neighborhoodImages: LabeledImage[] = (selectedCity.Neighborhoods === null || selectedCity.Neighborhoods === undefined) ? null :
    selectedCity.Neighborhoods
      .map<LabeledImage>((neighborhood: Neighborhood) => { return { id: neighborhood.ID, label: neighborhood.Name, source: neighborhood.FeaturedImage }; });

  const metroName = store.metrosMap.get(selectedCity.MetroID)?.Name;
  const cityName = selectedCity.Name;

  return (
    <Fragment>
      <NavBar editIcon={ true } id={ selectedCity.ID } onEdit={ openEditingScreen } name={ selectedCity.Name } />
      <Container className="cities-container">
        <Stack direction="vertical" gap={3}>
          <Breadcrumbs
            active="metro"
            metroID={ selectedCity.MetroID }
            cityID={ selectedCity.ID }
            metro={ metroName }
            city={ cityName }
          />
          <ImagesCard
            errorMessage="No images are currently attached."
            openAddPics={ openUploadPicsScreen }
            pics={ store.pics }
          />
          <LabeledImagesCard
            onItemAddClick={ null }
            errorMessage="No neighborhoods in this metro currently."
            name="Neighborhoods"
            onClick={ onNeighborhoodClick }
            items={ neighborhoodImages }
          />
        </Stack>
      </Container>
      <EditCity id={ selectedCity.ID } store={ store } />
      <AddPics onCloseModal={ closeUploadPicsScreen } shown={ store.uploadPicsModalOpen } fileUpload={ fileUpload } />
    </Fragment>
  );
});
