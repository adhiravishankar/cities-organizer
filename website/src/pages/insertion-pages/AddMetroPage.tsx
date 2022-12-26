import { useCallback } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { Metro } from '../../interfaces/Metro';
import { FormsPage } from '../../layouts/FormsPage';
import { AppStore } from '../../stores/AppStore';

export interface AddMetroPageProps {
  store: AppStore;
}

export function AddMetroPage(props: AddMetroPageProps) {
  const { store } = props;
  const { handleSubmit, control } = useForm<Metro>({ defaultValues: store.selectedCity });

  const navigation = useNavigate();

  const onSubmit = useCallback((data: Metro) => {
    store.insertMetro(data.Name, data.ExtendedName, data.Population, data.FeaturedImage);
    navigation('/');
  }, [store]);

  return (
    <FormsPage title="Add Metro">
      <Row>
        <Col>
          <Controller name="Name" control={control} render={({ field }) => <Form.Control { ...field } id="name" placeholder="Name" /> }/>
        </Col>
        <Col>
          <Controller name="ExtendedName" control={control} render={({ field }) => <Form.Control { ...field } id="extended_name" placeholder="Extended Name" /> }/>
        </Col>
        <Col>
          <Controller name="Population" control={control} render={({ field }) => <Form.Control { ...field } id="population" placeholder="Population" type="number" /> }/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={ handleSubmit(onSubmit) } type="submit">Submit</Button>
        </Col>
      </Row>
    </FormsPage>
  );
}
