import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Controller, useController, useForm } from 'react-hook-form';

import { DropdownUsingArray } from '../../components/DropdownUsingArray';
import { City } from '../../interfaces/City';
import { Metro } from '../../interfaces/Metro';
import { AppStore } from '../../stores/AppStore';


export interface EditCityProps {
  id: number;

  store: AppStore;
}

export const EditCity = observer<EditCityProps>((props: EditCityProps) => {
  const { id, store } = props;
  const { pics } = store;

  const { handleSubmit, control } = useForm<City>({ defaultValues: store.selectedCity });
  const handleClose = () => store.editingModalVisibilityChange(false);

  const onSubmit = useCallback((data: City) => {
    store.editCity(data.ID, data.Name, data.Population, data.FeaturedImage, data.Notes);
    handleClose();
  }, [id, store]);

  const { field: fiField } = useController({ name: 'FeaturedImage', control });

  return (
    <Modal show={ store.editingModalOpen } onHide={ handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>{`Edit ${ store.selectedCity.Name }`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <Controller name="Name" control={control} render={({ field }) => <Form.Control { ...field } id="name" placeholder="Name" /> }/>
          <Controller name="Population" control={control} render={({ field }) => <Form.Control { ...field } id="population" placeholder="Population" type="number" /> }/>
          <DropdownUsingArray onChange={ fiField.onChange } options={ pics } title="Featured Image" value={ fiField.value } />
          <Button onClick={ handleSubmit(onSubmit) } type="submit">Submit</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
});
