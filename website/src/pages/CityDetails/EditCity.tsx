import { MenuItem, Select, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Controller, useController, useForm } from 'react-hook-form';

import { City } from '../../common/interfaces/City';
import { AppStore } from '../../common/stores/AppStore';


export interface EditCityProps {
  id: string;

  store: AppStore;
}

export const EditCity = observer<EditCityProps>((props: EditCityProps) => {
  const { id, store } = props;

  const { handleSubmit, control } = useForm<City>({ defaultValues: store.selectedCity.City });
  const handleClose = () => store.editingModalVisibilityChange(false);

  const onSubmit = useCallback((data: City) => {
    store.updateCity(data.ID, data.Name, data.Population, data.FeaturedImage, data.Notes);
    handleClose();
  }, [id, store]);

  const { field: fiField } = useController({ name: 'FeaturedImage', control });

  const picsJSX: JSX.Element[] = [];
  store.selectedCity.Pics.forEach((text: string) =>
    picsJSX.push(<MenuItem key={ text } value={ text }>{ text }</MenuItem>));

  return (
    <Modal show={ store.editingModalOpen } onHide={ handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>{`Edit ${ store.selectedCity.City.Name }`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <Controller name="Name" control={control} render={({ field }) => <TextField { ...field } id="name" placeholder="Name" /> }/>
          <Controller name="Population" control={control} render={({ field }) => <TextField { ...field } id="population" placeholder="Population" type="number" /> }/>
          <Select onChange={ fiField.onChange } value={ fiField.value } label="Featured Image">{ picsJSX }</Select>
          <Button variant="contained" onClick={ handleSubmit(onSubmit) } type="submit">Submit</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
});
