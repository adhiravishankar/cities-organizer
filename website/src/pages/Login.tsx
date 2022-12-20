import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useCallback } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { API } from '../apis/API';

interface LoginInputs {
  username: string;
  password: string;
}

interface LoginProps {
  api: API;
}

export function Login(props: LoginProps) {

  const { handleSubmit, control } = useForm<LoginInputs>({ defaultValues: { username: '', password: '' } });

  const onSubmit = useCallback<SubmitHandler<LoginInputs>>(async (data: LoginInputs) => {

  }, [props.api]);

  return (
    <Stack direction="column" justifyContent="center" sx={{ height: '100%', bgcolor: blue[900] }}>
      <Box sx={ { m: 'auto', p: '1rem', width: '20rem', bgcolor: 'white', borderRadius: 1 } }>
        <Typography variant="h3" gutterBottom>Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller name="username" control={control} render={({ field }) => <TextField { ...field } id="username" label="Username" variant="standard" fullWidth /> }/>
          <Controller name="password" control={control} render={({ field }) => <TextField { ...field } id="password" label="Password" variant="standard" type="password" fullWidth /> } />
          <Grid container justifyContent="flex-end" sx={ { mt: '1rem' } } spacing={2}>
            <Grid item>
              <Button variant="outlined">Cancel</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit">Submit</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Stack>
  );
}

