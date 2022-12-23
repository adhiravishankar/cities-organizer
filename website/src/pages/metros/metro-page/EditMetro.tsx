import { Button, Grid, TextField, Typography } from '@mui/material';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Metro } from '../../../interfaces/Metro';


export interface EditMetroProps {
  metro: Metro;

  editMetro: (metro: Metro) => void;
}

export function EditMetro(props: EditMetroProps) {
  const { editMetro, metro } = props;

  const { handleSubmit, control } = useForm<Metro>({ defaultValues: props.metro });

  const onSubmit = useCallback((data: Metro) => {
    editMetro(data);
  }, [editMetro]);

  return (
    <form>
      <Grid container>
        <Typography variant="h4" sx={{ mb: '1rem' }}>{`Edit ${ metro.Name }`}</Typography>
        <Controller name="Name" control={control} render={({ field }) => <TextField { ...field } id="name" label="Name" variant="standard" fullWidth /> }/>
        <Controller name="ExtendedName" control={control} render={({ field }) => <TextField { ...field } id="extended_name" label="Extended Name" variant="standard" fullWidth /> }/>
        <Controller name="Population" control={control} render={({ field }) => <TextField { ...field } id="population" label="Population" variant="standard" fullWidth type="number" /> }/>
        <Button onClick={ handleSubmit(onSubmit) } type="submit">Submit</Button>
      </Grid>
    </form>
  );
}
