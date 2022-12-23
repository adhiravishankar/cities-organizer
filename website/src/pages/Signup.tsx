import { useCallback } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { API } from '../apis/API';

interface SignupInputs {
  name: string;
  username: string;
  password: string;
}

interface LoginProps {
  api: API;
}

export function Login(props: LoginProps) {

  const { handleSubmit, control } = useForm<SignupInputs>({ defaultValues: { name: '', username: '', password: '' } });

  const onSubmit = useCallback<SubmitHandler<SignupInputs>>(async (data: SignupInputs) => {
    await props.api.signup(data.username, data.password, data.name);
  }, [props.api]);

  return (
    <Stack direction="column" justifyContent="center" sx={{ height: '100%', bgcolor: blue[900] }}>
      <Box sx={ { m: 'auto', p: '1rem', width: '20rem', bgcolor: 'white', borderRadius: 1 } }>
        <h3>Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller name="name" control={control} render={({ field }) => <Form.Control { ...field } id="name" label="Name" variant="standard" fullWidth /> }/>
          <Controller name="username" control={control} render={({ field }) => <Form.Control { ...field } id="username" label="Username" variant="standard" fullWidth /> }/>
          <Controller name="password" control={control} render={({ field }) => <Form.Control { ...field } id="password" label="Password" variant="standard" type="password" fullWidth /> } />
          <Row container justifyContent="flex-end" sx={ { mt: '1rem' } } spacing={2}>
            <Col item>
              <Button variant="outlined">Cancel</Button>
            </Col>
            <Col item>
              <Button variant="contained" type="submit">Submit</Button>
            </Col>
          </Row>
        </form>
      </Box>
    </Stack>
  );
}

