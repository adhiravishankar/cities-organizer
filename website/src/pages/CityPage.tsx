import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useContainer } from 'unstated-next';
import { useBoolean } from 'usehooks-ts';

import { BreadcrumbsProps } from '../hooks/Breadcrumbs';
import { CardsPage } from '../hooks/CardsPage';
import { ImagesCard } from '../hooks/ImagesCard';
import { LabeledImagesCard } from '../hooks/LabeledImagesCard';
import { NavBarProps } from '../hooks/NavBar';
import { LabeledImage } from '../interfaces/LabeledImage';
import { Neighborhood } from '../interfaces/Neighborhood';
import { AddPicsProps } from '../modals/AddPics';
import { EditCity } from '../modals/EditCity';
import { AppStore } from '../stores/AppStore';
import { ModalsContainer } from '../stores/ModalsStore';
import {API} from "../apis/API";

interface CityProps {
  store: AppStore;
}

export const CityPage = observer<CityProps>((props: CityProps) => {
  const ModalsContext = useContainer(ModalsContainer);
  const api = new API();

  const { store } = props;
  const { selectedCity } = store;
  const navigation = useNavigate();
  const editingModalOpen = useBoolean(false);

  const fileUpload = useCallback(async (file: File) => {
    await api.uploadPic(selectedCity.City.ID, file);
  }, [store, selectedCity]);

  const onNeighborhoodClick = useCallback((id: string) => {
    navigation('/neighborhoods/' + id);
  }, []);

  const refresh = useCallback(() => navigation(0), []);

  const neighborhoodImages: LabeledImage[] = (selectedCity.Neighborhoods === null || selectedCity.Neighborhoods === undefined) ? null :
    selectedCity.Neighborhoods
      .map<LabeledImage>((neighborhood: Neighborhood) => { return { ID: neighborhood.ID, Label: neighborhood.Name, Source: neighborhood.FeaturedImage }; });

  const metroName = store.metrosMap.get(selectedCity.City.MetroID)?.Name;
  const cityName = selectedCity.City.Name;

  const breadCrumbsProps: BreadcrumbsProps = { active: 'city', metroID: selectedCity.City.MetroID,
    cityID: selectedCity.City.ID, metro: metroName, city: cityName };
  const editCity = <EditCity open={ editingModalOpen } id={ selectedCity.City.ID } store={ store } />;
  const addPicsProps: AddPicsProps = { fileUpload, refresh };
  const navBarProps: NavBarProps = { editIcon: true, id: selectedCity.City.ID, onEdit: editingModalOpen.setTrue, name: selectedCity.City.Name };

  return (
    <CardsPage
      breadcrumbs={ breadCrumbsProps }
      notes={ selectedCity.City.Notes }
      editModal={ editCity }
      addPicsProps={ addPicsProps }
      navBarProps={ navBarProps }
    >
      <ImagesCard
        errorMessage="No images are currently attached."
        openAddPics={ ModalsContext.uploadPicsModal.setTrue }
        pics={ store.selectedCity.Pics }
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
