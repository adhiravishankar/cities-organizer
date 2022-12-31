import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';

import { AddPicsProps } from '../../common/hooks/AddPics';
import { BreadcrumbsProps } from '../../common/hooks/Breadcrumbs';
import { CardsPage } from '../../common/hooks/CardsPage';
import { ImagesCard } from '../../common/hooks/ImagesCard';
import { NavBarProps } from '../../common/hooks/NavBar';
import { AppStore } from '../../common/stores/AppStore';
import { EditNeighborhood } from './EditNeighborhood';

interface NeighborhoodProps {
  store: AppStore;
}

export const NeighborhoodPage = observer<NeighborhoodProps>((props: NeighborhoodProps) => {
  const { store } = props;
  const { selectedNeighborhood } = store;

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

  const metroName = store.metrosMap.get(selectedNeighborhood.Neighborhood.MetroID)?.Name;
  const cityName = store.citiesMap.get(selectedNeighborhood.Neighborhood.CityID)?.Name;

  const breadCrumbsProps: BreadcrumbsProps = { active: 'metro', neighborhoodID: selectedNeighborhood.Neighborhood.ID,
    metroID: selectedNeighborhood.Neighborhood.MetroID, cityID: selectedNeighborhood.Neighborhood.ID, neighborhood: selectedNeighborhood.Neighborhood.Name,
    metro: metroName, city: cityName };
  const editCity = <EditNeighborhood id={ selectedNeighborhood.Neighborhood.ID } store={ store } />;
  const addPicsProps: AddPicsProps = { onCloseModal: closeUploadPicsScreen, shown: store.uploadPicsModalOpen, fileUpload };
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
