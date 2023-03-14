import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router';
import { SWRResponse } from 'swr';
import { useContainer } from 'unstated-next';
import { useBoolean } from 'usehooks-ts';

import { API } from '../apis/API';
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
import { MetrosContainer } from '../stores/MetrosStore';
import { ModalsContainer } from '../stores/ModalsStore';
import { MetroCardsRow } from '../views/MetroCardsRow';

type MetroParams = {
  metro: string;
};

export const MetroPage = () => {
  const ModalsContext = useContainer(ModalsContainer);
  const MetrosContext = useContainer(MetrosContainer);
  const metroResponse: SWRResponse = useLoaderData();
  const api = new API();

  const params = useParams<MetroParams>();
  const editingModalOpen = useBoolean(false);
  const navigation = useNavigate();
  const metro = MetrosContext.metrosMap.get(params.metro);

  const fileUpload = useCallback(async (file: File) => {
    await api.uploadPic(metro.ID, file);
  }, [metro]);

  const onCityClick = useCallback((id: string) => {
    navigation('/cities/' + id);
  }, []);

  const onNeighborhoodClick = useCallback((id: string) => {
    navigation('/neighborhoods/' + id);
  }, []);

  const refresh = useCallback(() => navigation(0), []);


  const neighborhoodImages: LabeledImage[] = (MetrosContext.selectedMetro.Neighborhoods === null || MetrosContext.selectedMetro.Neighborhoods === undefined) ? null :
    MetrosContext.selectedMetro.Neighborhoods
      .map<LabeledImage>((neighborhood: Neighborhood) => { return { ID: neighborhood.ID, Label: neighborhood.Name, Source: neighborhood.FeaturedImage }; });

  const cityImages: LabeledImage[] = (MetrosContext.selectedMetro.Cities === null || MetrosContext.selectedMetro.Cities === undefined) ? null :
    MetrosContext.selectedMetro.Cities
      .map<LabeledImage>((city: City) => { return { ID: city.ID, Label: city.Name, Source: city.FeaturedImage }; });

  const metroName = MetrosContext.selectedMetro.Metropolitan.Name;

  const breadCrumbsProps: BreadcrumbsProps = { active: 'metro', metroID: MetrosContext.selectedMetro.Metropolitan.ID, metro: metroName };
  const editMetro = <EditMetro open={ editingModalOpen } id={ metro.ID } />;
  const addPicsProps: AddPicsProps = { fileUpload, refresh };
  const navBarProps: NavBarProps = { editIcon: true, id: MetrosContext.selectedMetro.Metropolitan.ID, onEdit: editingModalOpen.setTrue, name: MetrosContext.selectedMetro.Metropolitan.Name };

  return (
    <CardsPage
      breadcrumbs={ breadCrumbsProps }
      notes={ MetrosContext.selectedMetro.Metropolitan.Notes }
      editModal={ editMetro }
      addPicsProps={ addPicsProps }
      navBarProps={ navBarProps }
    >
      <MetroCardsRow selectedMetro={ MetrosContext.selectedMetro } />
      <ImagesCard
        errorMessage="No images are currently attached."
        openAddPics={ ModalsContext.uploadPicsModal.setTrue }
        pics={ MetrosContext.selectedMetro.Pics }
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
};
