import { MenuItem, Select, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { Button, Modal, Stack } from 'react-bootstrap';
import { Controller, useController, useForm } from 'react-hook-form';

import { UseBooleanOutput } from '../functions/UseBooleanOutput';
import { Metro } from '../interfaces/Metro';

export interface EditMetroProps {
  id: string;

  open: UseBooleanOutput;
}

export const EditMetro = observer<EditMetroProps>((props: EditMetroProps) => {
  const { id, store, open } = props;
  const metro = store.metrosMap.get(id);

  const { handleSubmit, control } = useForm<Metro>({ defaultValues: metro });

  const onSubmit = useCallback((data: Metro) => {
    store.updateMetro(data.ID, data.Name, data.ExtendedName, data.ShortName, data.MetroSizeRank, data.Population, data.FeaturedImage, data.Notes);
    open.setFalse();
  }, [id, store]);

  const { field: fiField } = useController({ name: 'FeaturedImage', control });

  const picsJSX: JSX.Element[] = [];
  store.selectedMetro.Pics.forEach((text: string) =>
    picsJSX.push(<MenuItem key={ text } value={ text }>{ text }</MenuItem>));

  return (
    <Modal show={ open.value } onHide={ open.setFalse }>
      <Modal.Header closeButton>
        <Modal.Title>{`Edit ${ metro.Name }`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <Stack direction="vertical" gap={ 2 }>
            <Controller name="Name" control={control} render={({ field }) => <TextField { ...field } id="name" fullWidth placeholder="Name" /> }/>
            <Controller name="ExtendedName" control={control} render={({ field }) => <TextField { ...field } id="extended_name" fullWidth placeholder="Extended Name" /> }/>
            <Controller name="ShortName" control={control} render={({ field }) => <TextField { ...field } id="short_name" fullWidth placeholder="Short Name" inputProps={ { maxLength: 3 } } /> }/>
            <Controller name="Population" control={control} render={({ field }) => <TextField { ...field } id="population" fullWidth placeholder="Population" type="number" /> }/>
            <Controller name="MetroSizeRank" control={control} render={({ field }) => <TextField { ...field } id="MetroSizeRank" fullWidth placeholder="Metro Size Rank" type="number" /> }/>
            <Select onChange={ fiField.onChange } value={ fiField.value } label="Featured Image">{ picsJSX }</Select>
            <Button variant="contained" onClick={ handleSubmit(onSubmit) } type="submit">Submit</Button>
          </Stack>
        </form>
      </Modal.Body>
    </Modal>
  );
});
