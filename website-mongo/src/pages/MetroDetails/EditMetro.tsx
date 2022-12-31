import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Controller, useController, useForm } from 'react-hook-form';

import { DropdownUsingArray } from '../../common/hooks/DropdownUsingArray';
import { Metro } from '../../common/interfaces/Metro';
import { AppStore } from '../../common/stores/AppStore';


export interface EditMetroProps {
  id: string;

  store: AppStore;
}

export const EditMetro = observer<EditMetroProps>((props: EditMetroProps) => {
  const { id, store } = props;
  const metro = store.metrosMap.get(id);

  const { handleSubmit, control } = useForm<Metro>({ defaultValues: metro });
  const handleClose = () => store.editingModalVisibilityChange(false);

  const onSubmit = useCallback((data: Metro) => {
    store.updateMetro(data.ID, data.Name, data.ExtendedName, data.MetroSizeRank, data.Population, data.FeaturedImage, data.Notes);
    handleClose();
  }, [id, store]);

  const { field: fiField } = useController({ name: 'FeaturedImage', control });

  return (
    <Modal show={ store.editingModalOpen } onHide={ handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>{`Edit ${ metro.Name }`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <Controller name="Name" control={control} render={({ field }) => <Form.Control { ...field } id="name" placeholder="Name" /> }/>
          <Controller name="ExtendedName" control={control} render={({ field }) => <Form.Control { ...field } id="extended_name" placeholder="Extended Name" /> }/>
          <Controller name="Population" control={control} render={({ field }) => <Form.Control { ...field } id="population" placeholder="Population" type="number" /> }/>
          <Controller name="MetroSizeRank" control={control} render={({ field }) => <Form.Control { ...field } id="MetroSizeRank" placeholder="Metro Size Rank" type="number" /> }/>
          <DropdownUsingArray onChange={ fiField.onChange } options={ store.selectedMetro.Pics } title="Featured Image" value={ fiField.value } />
          <Button onClick={ handleSubmit(onSubmit) } type="submit">Submit</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
});
