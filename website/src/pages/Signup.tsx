import { useCallback } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { AppStore } from '../stores/AppStore';


interface SignupInputs {
  name: string;
  username: string;
  password: string;
}

interface SignupProps {
  store: AppStore;
}

export function Signup(props: SignupProps) {

  const { handleSubmit, control } = useForm<SignupInputs>({ defaultValues: { name: '', username: '', password: '' } });

  const onSubmit = useCallback<SubmitHandler<SignupInputs>>(async (data: SignupInputs) => {
    await props.store.api.signup(data.username, data.password, data.name);
  }, [props.store.api]);

  return (
    <div className="auth-box-wrapper">
      <div style={ { margin: 'auto', padding: '1rem', width: '20rem', backgroundColor: 'white', borderRadius: 1 } }>
        <h3>Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller name="name" control={control} render={({ field }) => <Form.Control { ...field } id="name" placeholder="Name" /> }/>
          <Controller name="username" control={control} render={({ field }) => <Form.Control { ...field } id="username" placeholder="Username" /> }/>
          <Controller name="password" control={control} render={({ field }) => <Form.Control { ...field } id="password" placeholder="Password" type="password" /> } />
          <Row container justifyContent="flex-end" sx={ { mt: '1rem' } } spacing={2}>
            <Col item>
              <Button variant="outlined">Cancel</Button>
            </Col>
            <Col item>
              <Button variant="contained" type="submit">Submit</Button>
            </Col>
          </Row>
        </form>
      </div>
    </div>
  );
}

