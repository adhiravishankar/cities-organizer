import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';

import { AddPicsProps } from '../../components/AddPics';
import { ImagesCard } from '../../components/ImagesCard';
import { BreadcrumbsProps } from '../../layouts/Breadcrumbs';
import { CardsPage } from '../../layouts/CardsPage';
import { NavBarProps } from '../../layouts/NavBar';
import { AppStore } from '../../stores/AppStore';
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
    store.uploadPicForNeighborhood(selectedNeighborhood.ID, file);
  }, [store, selectedNeighborhood]);

  const metroName = store.metrosMap.get(selectedNeighborhood.MetroID)?.Name;
  const cityName = store.citiesMap.get(selectedNeighborhood.CityID)?.Name;

  const breadCrumbsProps: BreadcrumbsProps = { active: 'metro', neighborhoodID: selectedNeighborhood.ID,
    metroID: selectedNeighborhood.MetroID, cityID: selectedNeighborhood.ID, neighborhood: selectedNeighborhood.Name,
    metro: metroName, city: cityName };
  const editCity = <EditNeighborhood id={ selectedNeighborhood.ID } store={ store } />;
  const addPicsProps: AddPicsProps = { onCloseModal: closeUploadPicsScreen, shown: store.uploadPicsModalOpen, fileUpload };
  const navBarProps: NavBarProps = { editIcon: true, id: selectedNeighborhood.ID, onEdit: openEditingScreen, name: selectedNeighborhood.Name };

  return (
    <CardsPage
      breadcrumbs={ breadCrumbsProps }
      notes={ selectedNeighborhood.Notes }
      editModal={ editCity }
      addPicsProps={ addPicsProps }
      navBarProps={ navBarProps }
    >
      <ImagesCard
        errorMessage="No images are currently attached."
        openAddPics={ openUploadPicsScreen }
        pics={ store.pics }
      />
    </CardsPage>
  );
});
