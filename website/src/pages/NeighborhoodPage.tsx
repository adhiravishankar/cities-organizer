import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useContainer } from 'unstated-next';
import { useBoolean } from 'usehooks-ts';

import { API } from '../apis/API';
import { BreadcrumbsProps } from '../hooks/Breadcrumbs';
import { CardsPage } from '../hooks/CardsPage';
import { ImagesCard } from '../hooks/ImagesCard';
import { NavBarProps } from '../hooks/NavBar';
import { AddPicsProps } from '../modals/AddPics';
import { EditNeighborhood } from '../modals/EditNeighborhood';
import { CitiesContainer } from '../stores/CitiesStore';
import { MetrosContainer } from '../stores/MetrosStore';
import { ModalsContainer } from '../stores/ModalsStore';
import { NeighborhoodsContainer } from '../stores/NeighborhoodsStore';

export const NeighborhoodPage = () => {
  const MetrosStore = useContainer(MetrosContainer);
  const CitiesStore = useContainer(CitiesContainer);
  const ModalsContext = useContainer(ModalsContainer);
  const NeighborhoodsStore = useContainer(NeighborhoodsContainer);

  const api = new API();

  const navigation = useNavigate();
  const openEditingScreen = useBoolean(false);

  const fileUpload = useCallback(async (file: File) => {
    await api.uploadPic(NeighborhoodsStore.selectedNeighborhood.Neighborhood.ID, file);
  }, [NeighborhoodsStore.selectedNeighborhood]);

  const refresh = useCallback(() => navigation(0), []);

  const metroName = MetrosStore.metrosMap.get(NeighborhoodsStore.selectedNeighborhood.Neighborhood.MetroID)?.Name;
  const cityName = CitiesStore.citiesMap.get(NeighborhoodsStore.selectedNeighborhood.Neighborhood.CityID)?.Name;

  const breadCrumbsProps: BreadcrumbsProps = { active: 'neighborhood',
    neighborhoodID: NeighborhoodsStore.selectedNeighborhood.Neighborhood.ID, metroID: NeighborhoodsStore.selectedNeighborhood.Neighborhood.MetroID,
    cityID: NeighborhoodsStore.selectedNeighborhood.Neighborhood.CityID, neighborhood: NeighborhoodsStore.selectedNeighborhood.Neighborhood.Name,
    metro: metroName, city: cityName };
  const editCity = <EditNeighborhood open={ openEditingScreen } id={ NeighborhoodsStore.selectedNeighborhood.Neighborhood.ID } />;
  const addPicsProps: AddPicsProps = { fileUpload, refresh };
  const navBarProps: NavBarProps = { editIcon: true, id: NeighborhoodsStore.selectedNeighborhood.Neighborhood.ID, onEdit: openEditingScreen.setTrue, name: NeighborhoodsStore.selectedNeighborhood.Neighborhood.Name };

  return (
    <CardsPage
      breadcrumbs={ breadCrumbsProps }
      notes={ NeighborhoodsStore.selectedNeighborhood.Neighborhood.Notes }
      editModal={ editCity }
      addPicsProps={ addPicsProps }
      navBarProps={ navBarProps }
    >
      <ImagesCard
        errorMessage="No images are currently attached."
        openAddPics={ ModalsContext.uploadPicsModal.setTrue }
        pics={ NeighborhoodsStore.selectedNeighborhood.Pics }
      />
    </CardsPage>
  );
};
