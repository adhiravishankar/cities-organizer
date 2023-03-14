import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useContainer } from 'unstated-next';
import { useBoolean } from 'usehooks-ts';

import { BreadcrumbsProps } from '../hooks/Breadcrumbs';
import { CardsPage } from '../hooks/CardsPage';
import { ImagesCard } from '../hooks/ImagesCard';
import { LabeledImagesCard } from '../hooks/LabeledImagesCard';
import { NavBarProps } from '../hooks/NavBar';
import { City } from '../interfaces/City';
import { LabeledImage } from '../interfaces/LabeledImage';
import { Neighborhood } from '../interfaces/Neighborhood';
import { AddPicsProps } from '../modals/AddPics';
import { EditMetro } from '../modals/EditMetro';
import { AppStore } from '../stores/AppStore';
import { ModalsContainer } from '../stores/ModalsStore';
import { MetroCardsRow } from '../views/MetroCardsRow';

type MetroParams = {
  metro: string;
};

interface MetroProps {
  store: AppStore;
}

export const MetroPage = observer<MetroProps>((props: MetroProps) => {
  const ModalsContext = useContainer(ModalsContainer);

  const { store } = props;
  const { metrosMap, selectedMetro } = store;
  const params = useParams<MetroParams>();
  const editingModalOpen = useBoolean(false);
  const navigation = useNavigate();
  const metro = metrosMap.get(params.metro);

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
  const editMetro = <EditMetro open={ editingModalOpen } id={ metro.ID } store={ store } />;
  const addPicsProps: AddPicsProps = { fileUpload, refresh };
  const navBarProps: NavBarProps = { editIcon: true, id: selectedMetro.Metropolitan.ID, onEdit: editingModalOpen.setTrue, name: selectedMetro.Metropolitan.Name };

  return (
    <CardsPage
      breadcrumbs={ breadCrumbsProps }
      notes={ selectedMetro.Metropolitan.Notes }
      editModal={ editMetro }
      addPicsProps={ addPicsProps }
      navBarProps={ navBarProps }
    >
      <MetroCardsRow selectedMetro={ selectedMetro } />
      <ImagesCard
        errorMessage="No images are currently attached."
        openAddPics={ ModalsContext.uploadPicsModal.setTrue }
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
