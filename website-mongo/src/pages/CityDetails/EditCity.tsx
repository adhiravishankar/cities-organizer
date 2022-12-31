import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Controller, useController, useForm } from 'react-hook-form';

import { DropdownUsingArray } from '../../common/hooks/DropdownUsingArray';
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

  return (
    <Modal show={ store.editingModalOpen } onHide={ handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>{`Edit ${ store.selectedCity.City.Name }`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <Controller name="Name" control={control} render={({ field }) => <Form.Control { ...field } id="name" placeholder="Name" /> }/>
          <Controller name="Population" control={control} render={({ field }) => <Form.Control { ...field } id="population" placeholder="Population" type="number" /> }/>
          <DropdownUsingArray onChange={ fiField.onChange } options={ store.selectedCity.Pics } title="Featured Image" value={ fiField.value } />
          <Button onClick={ handleSubmit(onSubmit) } type="submit">Submit</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
});
