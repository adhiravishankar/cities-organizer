import { observer } from 'mobx-react-lite';
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
import { AppStore } from '../stores/AppStore';
import { ModalsContainer } from '../stores/ModalsStore';

interface NeighborhoodProps {
  store: AppStore;
}

export const NeighborhoodPage = observer<NeighborhoodProps>((props: NeighborhoodProps) => {
  const ModalsContext = useContainer(ModalsContainer);
  const api = new API();

  const { store } = props;
  const { selectedNeighborhood } = store;
  const navigation = useNavigate();
  const openEditingScreen = useBoolean(false);

  const fileUpload = useCallback(async (file: File) => {
    await api.uploadPic(selectedNeighborhood.Neighborhood.ID, file);
  }, [store, selectedNeighborhood]);

  const refresh = useCallback(() => navigation(0), []);

  const metroName = store.metrosMap.get(selectedNeighborhood.Neighborhood.MetroID)?.Name;
  const cityName = store.citiesMap.get(selectedNeighborhood.Neighborhood.CityID)?.Name;

  const breadCrumbsProps: BreadcrumbsProps = { active: 'neighborhood',
    neighborhoodID: selectedNeighborhood.Neighborhood.ID, metroID: selectedNeighborhood.Neighborhood.MetroID,
    cityID: selectedNeighborhood.Neighborhood.CityID, neighborhood: selectedNeighborhood.Neighborhood.Name,
    metro: metroName, city: cityName };
  const editCity = <EditNeighborhood open={ openEditingScreen } id={ selectedNeighborhood.Neighborhood.ID } store={ store } />;
  const addPicsProps: AddPicsProps = { fileUpload, refresh };
  const navBarProps: NavBarProps = { editIcon: true, id: selectedNeighborhood.Neighborhood.ID, onEdit: openEditingScreen.setTrue, name: selectedNeighborhood.Neighborhood.Name };

  return (
    <CardsPage
      breadcrumbs={ breadCrumbsProps }
      notes={ selectedNeighborhood.Neighborhood.Notes }
      editModal={ editCity }
      addPicsProps={ addPicsProps }
      navBarProps={ navBarProps }
    >
      <ImagesCard
        errorMessage="No images are currently attached."
        openAddPics={ ModalsContext.uploadPicsModal.setTrue }
        pics={ store.selectedNeighborhood.Pics }
      />
    </CardsPage>
  );
});
