import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';

import { AddPicsProps } from '../../common/hooks/AddPics';
import { BreadcrumbsProps } from '../../common/hooks/Breadcrumbs';
import { CardsPage } from '../../common/hooks/CardsPage';
import { ImagesCard } from '../../common/hooks/ImagesCard';
import { LabeledImagesCard } from '../../common/hooks/LabeledImagesCard';
import { NavBarProps } from '../../common/hooks/NavBar';
import { City } from '../../common/interfaces/City';
import { LabeledImage } from '../../common/interfaces/LabeledImage';
import { Neighborhood } from '../../common/interfaces/Neighborhood';
import { AppStore } from '../../common/stores/AppStore';
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
  const metro = metrosMap.get(params.metro);

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
    store.uploadPic(metro.ID, file);
  }, [store, metro]);

  const onCityClick = useCallback((id: string) => {
    navigation('/cities/' + id);
  }, []);

  const onNeighborhoodClick = useCallback((id: string) => {
    navigation('/neighborhoods/' + id);
  }, []);

  const refresh = useCallback(() => navigation(0), []);


  const neighborhoodImages: LabeledImage[] = (selectedMetro.Neighborhoods === null || selectedMetro.Neighborhoods === undefined) ? null :
    selectedMetro.Neighborhoods
      .map<LabeledImage>((neighborhood: Neighborhood) => { return { ID: neighborhood.ID, Label: neighborhood.Name, Source: neighborhood.FeaturedImage }; });

  const cityImages: LabeledImage[] = (selectedMetro.Cities === null || selectedMetro.Cities === undefined) ? null :
    selectedMetro.Cities
      .map<LabeledImage>((city: City) => { return { ID: city.ID, Label: city.Name, Source: city.FeaturedImage }; });

  const metroName = selectedMetro.Metropolitan.Name;

  const breadCrumbsProps: BreadcrumbsProps = { active: 'metro', metroID: selectedMetro.Metropolitan.ID, metro: metroName };
  const editCity = <EditMetro id={ metro.ID } store={ store } />;
  const addPicsProps: AddPicsProps = { onCloseModal: closeUploadPicsScreen, shown: store.uploadPicsModalOpen, fileUpload, refresh };
  const navBarProps: NavBarProps = { editIcon: true, id: selectedMetro.Metropolitan.ID, onEdit: openEditingScreen, name: selectedMetro.Metropolitan.Name };

  return (
    <CardsPage
      breadcrumbs={ breadCrumbsProps }
      notes={ selectedMetro.Metropolitan.Notes }
      editModal={ editCity }
      addPicsProps={ addPicsProps }
      navBarProps={ navBarProps }
    >
      <ImagesCard
        errorMessage="No images are currently attached."
        openAddPics={ openUploadPicsScreen }
        pics={ store.selectedMetro.Pics }
      />
      <LabeledImagesCard
        errorMessage="No cities in this metro currently."
        name="Cities"
        onClick={ onCityClick }
        items={ cityImages }
      />
      <LabeledImagesCard
        errorMessage="No neighborhoods in this metro currently."
        name="Neighborhoods"
        onClick={ onNeighborhoodClick }
        items={ neighborhoodImages }
      />
    </CardsPage>
  );
});
