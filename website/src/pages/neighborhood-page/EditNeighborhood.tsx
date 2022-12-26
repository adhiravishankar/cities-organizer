import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Controller, useController, useForm } from 'react-hook-form';

import { DropdownUsingArray } from '../../components/DropdownUsingArray';
import { Metro } from '../../interfaces/Metro';
import { Neighborhood } from '../../interfaces/Neighborhood';
import { AppStore } from '../../stores/AppStore';


export interface EditNeighborhoodProps {
  id: number;

  store: AppStore;
}

export const EditNeighborhood = observer<EditNeighborhoodProps>((props: EditNeighborhoodProps) => {
  const { id, store } = props;
  const { pics } = store;

  const { handleSubmit, control } = useForm<Neighborhood>({ defaultValues: store.selectedNeighborhood });
  const handleClose = () => store.editingModalVisibilityChange(false);

  const onSubmit = useCallback((data: Neighborhood) => {

    handleClose();
  }, [id, store]);

  const { field: fiField } = useController({ name: 'FeaturedImage', control });

  return (
    <Modal show={ store.editingModalOpen } onHide={ handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>{`Edit ${ store.selectedNeighborhood.Name }`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <Controller name="Name" control={control} render={({ field }) => <Form.Control { ...field } id="name" placeholder="Name" /> }/>
          <DropdownUsingArray onChange={ fiField.onChange } options={ pics } title="Featured Image" value={ fiField.value } />
          <Button onClick={ handleSubmit(onSubmit) } type="submit">Submit</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
});
