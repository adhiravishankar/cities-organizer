import { observer } from 'mobx-react-lite';
import { Fragment, useCallback } from 'react';
import { Card, Container, Stack } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router';

import { AddPics } from '../../components/AddPics';
import { ImagesCard } from '../../components/ImagesCard';
import { LabeledImagesCard } from '../../components/LabeledImagesCard';
import { LabeledImage } from '../../interfaces/Base';
import { City } from '../../interfaces/City';
import { Neighborhood } from '../../interfaces/Neighborhood';
import { Breadcrumbs } from '../../layouts/Breadcrumbs';
import { NavBar } from '../../layouts/NavBar';
import { AppStore } from '../../stores/AppStore';
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
  const navigation = useNavigate();
  const metroID = Number.parseInt(params.metro);
  const metro = metrosMap.get(metroID);

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
    store.uploadPicForMetro(metro.ID, file);
  }, [store, metro]);

  const onCityClick = useCallback((id: number) => {
    navigation('/cities/' + id);
  }, []);

  const onNeighborhoodClick = useCallback((id: number) => {
    navigation('/neighborhoods/' + id);
  }, []);


  const neighborhoodImages: LabeledImage[] = (selectedMetro.Neighborhoods === null || selectedMetro.Neighborhoods === undefined) ? null :
    selectedMetro.Neighborhoods
      .map<LabeledImage>((neighborhood: Neighborhood) => { return { id: neighborhood.ID, label: neighborhood.Name, source: neighborhood.FeaturedImage }; });

  const cityImages: LabeledImage[] = (selectedMetro.Cities === null || selectedMetro.Cities === undefined) ? null :
    selectedMetro.Cities
      .map<LabeledImage>((city: City) => { return { id: city.ID, label: city.Name, source: city.FeaturedImage }; });

  const metroName = selectedMetro.Name;

  return (
    <Fragment>
      <NavBar editIcon={ true } id={ metro.ID } onEdit={ openEditingScreen } name={ selectedMetro.Name } />
      <Container className="cities-container">
        <Stack direction="vertical" gap={3}>
          <Breadcrumbs
            active="metro"
            metroID={ selectedMetro.ID }
            metro={ metroName }
          />
          <ImagesCard
            errorMessage="No images are currently attached."
            openAddPics={ openUploadPicsScreen }
            pics={ store.pics }
          />
          <LabeledImagesCard
            onItemAddClick={ null }
            errorMessage="No cities in this metro currently."
            name="Cities"
            onClick={ onCityClick }
            items={ cityImages }
          />
          <LabeledImagesCard
            onItemAddClick={ null }
            errorMessage="No neighborhoods in this metro currently."
            name="Neighborhoods"
            onClick={ onNeighborhoodClick }
            items={ neighborhoodImages }
          />
          <Card>
            <Card.Header><Card.Title>Notes</Card.Title></Card.Header>
            <Card.Body>
              <ReactMarkdown>{ store.selectedMetro.Notes }</ReactMarkdown>
            </Card.Body>
          </Card>
        </Stack>
      </Container>
      <EditMetro id={ metroID } store={ store } />
      <AddPics onCloseModal={ closeUploadPicsScreen } shown={ store.uploadPicsModalOpen } fileUpload={ fileUpload } />
    </Fragment>
  );
});
