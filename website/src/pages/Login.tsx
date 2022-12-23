import MaterialColors from 'material-colors';
import { useCallback } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { AppStore } from '../stores/AppStore';

interface LoginInputs {
  username: string;
  password: string;
}

interface LoginProps {
  store: AppStore;
}

export function Login(props: LoginProps) {

  const { handleSubmit, control } = useForm<LoginInputs>({ defaultValues: { username: '', password: '' } });

  const onSubmit = useCallback<SubmitHandler<LoginInputs>>(async (data: LoginInputs) => {

  }, [props.store.api]);

  return (
    <div style={{ height: '100%', backgroundColor: MaterialColors.blue['900'], justifyContent: 'center' }}>
      <div style={ { margin: 'auto', padding: '1rem', width: '20rem', backgroundColor: 'white', borderRadius: 1 } }>
        <h3>Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller name="username" control={control} render={({ field }) => <Form.Control { ...field } id="username" placeholder="Username" /> }/>
          <Controller name="password" control={control} render={({ field }) => <Form.Control { ...field } id="password" placeholder="Password" type="password" /> } />
          <Row justifyContent="flex-end" sx={ { mt: '1rem' } } spacing={2}>
            <Col>
              <Button variant="outlined">Cancel</Button>
            </Col>
            <Col>
              <Button variant="contained" type="submit">Submit</Button>
            </Col>
          </Row>
        </form>
      </div>
    </div>
  );
}

