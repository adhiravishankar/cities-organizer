import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useContainer } from 'unstated-next';
import { useBoolean } from 'usehooks-ts';

import { API } from '../apis/API';
import { BreadcrumbsProps } from '../hooks/Breadcrumbs';
import { CardsPage } from '../hooks/CardsPage';
import { ImagesCard } from '../hooks/ImagesCard';
import { LabeledImagesCard } from '../hooks/LabeledImagesCard';
import { NavBarProps } from '../hooks/NavBar';
import { LabeledImage } from '../interfaces/LabeledImage';
import { Neighborhood } from '../interfaces/Neighborhood';
import { AddPicsProps } from '../modals/AddPics';
import { EditCity } from '../modals/EditCity';
import { CitiesContainer } from '../stores/CitiesStore';
import { MetrosContainer } from '../stores/MetrosStore';
import { ModalsContainer } from '../stores/ModalsStore';

export const CityPage = () => {
  const MetrosStore = useContainer(MetrosContainer);
  const ModalsContext = useContainer(ModalsContainer);
  const CitiesStore = useContainer(CitiesContainer);
  const api = new API();

  const navigation = useNavigate();
  const editingModalOpen = useBoolean(false);

  const fileUpload = useCallback(async (file: File) => {
    await api.uploadPic(CitiesStore.selectedCity.City.ID, file);
  }, [CitiesStore.selectedCity]);

  const onNeighborhoodClick = useCallback((id: string) => {
    navigation('/neighborhoods/' + id);
  }, []);

  const refresh = useCallback(() => navigation(0), []);

  const neighborhoodImages: LabeledImage[] = (CitiesStore.selectedCity.Neighborhoods === null || CitiesStore.selectedCity.Neighborhoods === undefined) ? null :
    CitiesStore.selectedCity.Neighborhoods
      .map<LabeledImage>((neighborhood: Neighborhood) => { return { ID: neighborhood.ID, Label: neighborhood.Name, Source: neighborhood.FeaturedImage }; });

  const metroName = MetrosStore.metrosMap.get(CitiesStore.selectedCity.City.MetroID)?.Name;
  const cityName = CitiesStore.selectedCity.City.Name;

  const breadCrumbsProps: BreadcrumbsProps = { active: 'city', metroID: CitiesStore.selectedCity.City.MetroID,
    cityID: CitiesStore.selectedCity.City.ID, metro: metroName, city: cityName };
  const editCity = <EditCity open={ editingModalOpen } id={ CitiesStore.selectedCity.City.ID } />;
  const addPicsProps: AddPicsProps = { fileUpload, refresh };
  const navBarProps: NavBarProps = { editIcon: true, id: CitiesStore.selectedCity.City.ID, onEdit: editingModalOpen.setTrue, name: CitiesStore.selectedCity.City.Name };

  return (
    <CardsPage
      breadcrumbs={ breadCrumbsProps }
      notes={ CitiesStore.selectedCity.City.Notes }
      editModal={ editCity }
      addPicsProps={ addPicsProps }
      navBarProps={ navBarProps }
    >
      <ImagesCard
        errorMessage="No images are currently attached."
        openAddPics={ ModalsContext.uploadPicsModal.setTrue }
        pics={ CitiesStore.selectedCity.Pics }
      />
      <LabeledImagesCard
        errorMessage="No neighborhoods in this metro currently."
        name="Neighborhoods"
        onClick={ onNeighborhoodClick }
        items={ neighborhoodImages }
      />
    </CardsPage>
  );
};
