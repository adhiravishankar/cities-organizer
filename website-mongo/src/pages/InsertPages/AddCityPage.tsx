import { useCallback } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useController, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { DropdownNumberMap } from '../../common/hooks/DropdownNumberMap';
import { FormsPage } from '../../common/hooks/FormsPage';
import { City } from '../../common/interfaces/City';
import { AppStore } from '../../common/stores/AppStore';


export interface AddCityPageProps {
  store: AppStore;
}

export function AddCityPage(props: AddCityPageProps) {
  const { store } = props;
  const navigation = useNavigate();

  const { handleSubmit, control } = useForm<City>();

  const onSubmit = useCallback(async (data: City) => {
    await store.insertCity(data.Name, data.MetroID, data.Population, data.FeaturedImage, data.Notes);
    navigation('/');
  }, [store]);

  const { field: miField } = useController({ name: 'MetroID', control });

  return (
    <FormsPage title="Add City">
      <Row>
        <Col>
          <Controller name="Name" control={control} render={({ field }) => <Form.Control { ...field } id="name" placeholder="Name" /> }/>
        </Col>
        <Col>
          <Controller name="Population" control={control} render={({ field }) => <Form.Control { ...field } id="population" placeholder="Population" type="number" /> }/>
        </Col>
        <Col className="col-2">
          <DropdownNumberMap onChange={ miField.onChange } options={ store.metroNamesMap } title="Metro Area" value={ miField.value } />
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
