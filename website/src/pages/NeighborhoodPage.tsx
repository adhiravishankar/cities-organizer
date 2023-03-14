import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { AddPicsProps } from '../modals/AddPics';
import { BreadcrumbsProps } from '../hooks/Breadcrumbs';
import { CardsPage } from '../hooks/CardsPage';
import { ImagesCard } from '../hooks/ImagesCard';
import { NavBarProps } from '../hooks/NavBar';
import { AppStore } from '../stores/AppStore';
import { EditNeighborhood } from '../modals/EditNeighborhood';

interface NeighborhoodProps {
  store: AppStore;
}

export const NeighborhoodPage = observer<NeighborhoodProps>((props: NeighborhoodProps) => {
  const { store } = props;
  const { selectedNeighborhood } = store;
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
    store.uploadPic(selectedNeighborhood.Neighborhood.ID, file);
  }, [store, selectedNeighborhood]);

  const refresh = useCallback(() => navigation(0), []);

  const metroName = store.metrosMap.get(selectedNeighborhood.Neighborhood.MetroID)?.Name;
  const cityName = store.citiesMap.get(selectedNeighborhood.Neighborhood.CityID)?.Name;

  const breadCrumbsProps: BreadcrumbsProps = { active: 'neighborhood',
    neighborhoodID: selectedNeighborhood.Neighborhood.ID, metroID: selectedNeighborhood.Neighborhood.MetroID,
    cityID: selectedNeighborhood.Neighborhood.CityID, neighborhood: selectedNeighborhood.Neighborhood.Name,
    metro: metroName, city: cityName };
  const editCity = <EditNeighborhood id={ selectedNeighborhood.Neighborhood.ID } store={ store } />;
  const addPicsProps: AddPicsProps = { onCloseModal: closeUploadPicsScreen, shown: store.uploadPicsModalOpen, fileUpload, refresh };
  const navBarProps: NavBarProps = { editIcon: true, id: selectedNeighborhood.Neighborhood.ID, onEdit: openEditingScreen, name: selectedNeighborhood.Neighborhood.Name };

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
        openAddPics={ openUploadPicsScreen }
        pics={ store.selectedNeighborhood.Pics }
      />
    </CardsPage>
  );
});
