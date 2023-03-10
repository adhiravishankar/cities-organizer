import { MenuItem, Select, TextField } from '@mui/material';
import { useCallback } from 'react';
import { Button, Modal, Stack } from 'react-bootstrap';
import { Controller, useController, useForm } from 'react-hook-form';
import { useContainer } from 'unstated-next';

import { UseBooleanOutput } from '../functions/UseBooleanOutput';
import { Metro } from '../interfaces/Metro';
import { MetrosContainer } from '../stores/MetrosStore';

export interface EditMetroProps {
  id: string;

  open: UseBooleanOutput;
}

export const EditMetro = (props: EditMetroProps) => {
  const MetrosStore = useContainer(MetrosContainer);

  const { id, open } = props;
  const metro = MetrosStore.metrosMap.get(id);

  const { handleSubmit, control } = useForm<Metro>({ defaultValues: metro });

  const onSubmit = useCallback((data: Metro) => {
    MetrosStore.updateMetro(data.ID, data.Name, data.ExtendedName, data.ShortName, data.MetroSizeRank, data.Population, data.FeaturedImage, data.Notes);
    open.setFalse();
  }, [id]);

  const { field: fiField } = useController({ name: 'FeaturedImage', control });

  const picsJSX: JSX.Element[] = [];
  MetrosStore.selectedMetro.Pics.forEach((text: string) =>
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
};
