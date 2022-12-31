import {MenuItem, Select, TextField} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Controller, useController, useForm } from 'react-hook-form';

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

  const picsJSX: JSX.Element[] = [];
  store.selectedMetro.Pics.forEach((text: string) =>
    picsJSX.push(<MenuItem key={ text } value={ text }>{ text }</MenuItem>));

  return (
    <Modal show={ store.editingModalOpen } onHide={ handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>{`Edit ${ metro.Name }`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <Controller name="Name" control={control} render={({ field }) => <TextField { ...field } id="name" placeholder="Name" /> }/>
          <Controller name="ExtendedName" control={control} render={({ field }) => <TextField { ...field } id="extended_name" placeholder="Extended Name" /> }/>
          <Controller name="Population" control={control} render={({ field }) => <TextField { ...field } id="population" placeholder="Population" type="number" /> }/>
          <Controller name="MetroSizeRank" control={control} render={({ field }) => <TextField { ...field } id="MetroSizeRank" placeholder="Metro Size Rank" type="number" /> }/>
          <Select onChange={ fiField.onChange } value={ fiField.value } label="Featured Image">{ picsJSX }</Select>
          <Button variant="contained" onClick={ handleSubmit(onSubmit) } type="submit">Submit</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
});
