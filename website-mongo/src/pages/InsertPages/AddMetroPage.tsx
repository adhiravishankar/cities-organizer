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

  const onSubmit = useCallback(async (data: Metro) => {
    store.insertMetro(data.Name, data.ExtendedName, data.MetroSizeRank, data.Population, data.FeaturedImage, data.Notes).next(() => {
      navigation('/');
    });
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
        <Col>
          <Controller name="MetroSizeRank" control={control} render={({ field }) => <Form.Control { ...field } id="MetroSizeRank" placeholder="Metro Size Rank" type="number" /> }/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Controller name="Notes" control={control} render={({ field }) => <Form.Control { ...field } id="Notes" placeholder="Notes" as="textarea" rows={ 10 } /> }/>
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
