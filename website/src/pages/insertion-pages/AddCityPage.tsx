import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useController, useForm } from 'react-hook-form';

import { DropdownNumberMap } from '../../components/DropdownNumberMap';
import { DropdownUsingArray } from '../../components/DropdownUsingArray';
import { City } from '../../interfaces/City';
import { FormsPage } from '../../layouts/FormsPage';
import { AppStore } from '../../stores/AppStore';

export interface AddCityPageProps {
  store: AppStore;
}

export function AddCityPage(props: AddCityPageProps) {
  const { store } = props;

  const { handleSubmit, control } = useForm<City>({ defaultValues: store.selectedCity });

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
        <Col>
          <DropdownNumberMap onChange={ miField.onChange } options={ store.metroNamesMap } title="Metro Area" value={ miField.value } />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button>Submit</Button>
        </Col>
      </Row>
    </FormsPage>
  );
}
