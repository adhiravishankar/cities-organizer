import { MenuItem, Select, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { Button, Modal, Stack } from 'react-bootstrap';
import { Controller, useController, useForm } from 'react-hook-form';

import { Neighborhood } from '../../interfaces/Neighborhood';
import { AppStore } from '../../stores/AppStore';


export interface EditNeighborhoodProps {
  id: string;

  store: AppStore;
}

export const EditNeighborhood = observer<EditNeighborhoodProps>((props: EditNeighborhoodProps) => {
  const { id, store } = props;

  const { handleSubmit, control } = useForm<Neighborhood>({ defaultValues: store.selectedNeighborhood.Neighborhood });
  const handleClose = () => store.editingModalVisibilityChange(false);

  const onSubmit = useCallback((data: Neighborhood) => {

    handleClose();
  }, [id, store]);

  const { field: fiField } = useController({ name: 'FeaturedImage', control });

  const picsJSX: JSX.Element[] = [];
  store.selectedNeighborhood.Pics.forEach((text: string) =>
    picsJSX.push(<MenuItem key={ text } value={ text }>{ text }</MenuItem>));

  return (
    <Modal show={ store.editingModalOpen } onHide={ handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>{`Edit ${ store.selectedNeighborhood.Neighborhood.Name }`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <Stack direction="vertical" gap={ 2 }>
            <Controller name="Name" control={control} render={({ field }) => <TextField { ...field } id="name" placeholder="Name" /> }/>
            <Select onChange={ fiField.onChange } value={ fiField.value } label="Featured Image">{ picsJSX }</Select>
            <Button variant="contained" onClick={ handleSubmit(onSubmit) } type="submit">Submit</Button>
          </Stack>
        </form>
      </Modal.Body>
    </Modal>
  );
});
