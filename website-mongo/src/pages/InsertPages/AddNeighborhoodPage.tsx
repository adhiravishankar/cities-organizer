import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useController, useForm } from 'react-hook-form';

import { DropdownNumberMap } from '../../common/hooks/DropdownNumberMap';
import { FormsPage } from '../../common/hooks/FormsPage';
import { Neighborhood } from '../../common/interfaces/Neighborhood';
import { AppStore } from '../../common/stores/AppStore';

export interface AddNeighborhoodPageProps {
  store: AppStore;
}

export const AddNeighborhoodPage = observer<AddNeighborhoodPageProps>((props: AddNeighborhoodPageProps) => {
  const { store } = props;
  const { handleSubmit, control } = useForm<Neighborhood>();

  const onSubmit = useCallback((data: Neighborhood) => {

  }, [store]);

  const { field: ciField } = useController({ name: 'CityID', control });
  const { field: miField } = useController({ name: 'MetroID', control });

  const onChangeMetroArea = useCallback((events: string) => {
    store.updateSelectedMetro(events);
    miField.onChange(-1);
    miField.onChange(events);
  }, []);


  return (
    <FormsPage title="Add Neighborhood">
      <Row>
        <Col>
          <Controller name="Name" control={control} render={({ field }) => <Form.Control { ...field } id="name" placeholder="Name" /> }/>
        </Col>
        <Col>
          <Controller name="Link" control={control} render={({ field }) => <Form.Control { ...field } id="Link" placeholder="Link" /> }/>
        </Col>
        <Col className="col-2">
          <DropdownNumberMap onChange={ onChangeMetroArea } options={ store.metroNamesMap } title="Metro Area" value={ miField.value } />
        </Col>
        <Col className="col-2">
          <DropdownNumberMap onChange={ ciField.onChange } options={ store.filteredCitiesMap } title="City Area" value={ ciField.value } />
        </Col>
      </Row>
      <Row>
        <Col>
          <Controller name="Address" control={control} render={({ field }) => <Form.Control { ...field } id="Address" placeholder="Address" /> }/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Controller name="ElementarySchoolScore" control={control} render={({ field }) => <Form.Control { ...field } id="ElementarySchoolScore" placeholder="Elementary School Score" type="number" /> }/>
        </Col>
        <Col>
          <Controller name="MiddleSchoolScore" control={control} render={({ field }) => <Form.Control { ...field } id="MiddleSchoolScore" placeholder="Middle School Score" type="number" /> }/>
        </Col>
        <Col>
          <Controller name="HighSchoolScore" control={control} render={({ field }) => <Form.Control { ...field } id="HighSchoolScore" placeholder="High School Score" type="number" /> }/>
        </Col>
        <Col>
          <Controller name="MinimumValue" control={control} render={({ field }) => <Form.Control { ...field } id="MinimumValue" placeholder="Minimum Value" type="number" /> }/>
        </Col>
        <Col>
          <Controller name="MaximumValue" control={control} render={({ field }) => <Form.Control { ...field } id="MaximumValue" placeholder="Maximum Value" type="number" /> }/>
        </Col>
        <Col>
          <Controller name="MinSqft" control={control} render={({ field }) => <Form.Control { ...field } id="MinSqft" placeholder="Minimum Sq. Ft." type="number" /> }/>
        </Col>
        <Col>
          <Controller name="MaxSqft" control={control} render={({ field }) => <Form.Control { ...field } id="MaxSqft" placeholder="Maximum Sq. Ft." type="number" /> }/>
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
});
