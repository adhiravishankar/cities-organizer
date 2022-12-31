import {MenuItem, Select, TextField} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Controller, useController, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { FormsPage } from '../../common/hooks/FormsPage';
import { Neighborhood } from '../../common/interfaces/Neighborhood';
import { AppStore } from '../../common/stores/AppStore';

export interface AddNeighborhoodPageProps {
  store: AppStore;
}

export const AddNeighborhoodPage = observer<AddNeighborhoodPageProps>((props: AddNeighborhoodPageProps) => {
  const { store } = props;
  const { handleSubmit, control } = useForm<Neighborhood>();
  const navigation = useNavigate();

  const onSubmit = useCallback(async (data: Neighborhood) => {
    await store.insertNeighborhood(data);
    navigation('/');
  }, [store]);

  const { field: ciField } = useController({ name: 'CityID', control });
  const { field: miField } = useController({ name: 'MetroID', control });

  const onChangeMetroArea = useCallback((events: string) => {
    store.updateSelectedMetro(events);
    miField.onChange(-1);
    miField.onChange(events);
  }, []);

  const metroItems: JSX.Element[] = [];
  store.metroNamesMap.forEach((text: string, id: string) =>
    metroItems.push(<MenuItem key={ id } value={ id }>{ text }</MenuItem>));

  const cityItems: JSX.Element[] = [];
  store.filteredCitiesMap.forEach((text: string, id: string) =>
    cityItems.push(<MenuItem key={ id } value={ id }>{ text }</MenuItem>));

  return (
    <FormsPage title="Add Neighborhood">
      <Row>
        <Col>
          <Controller name="Name" control={control} render={({ field }) => <TextField { ...field } id="name" placeholder="Name" /> }/>
        </Col>
        <Col>
          <Controller name="Link" control={control} render={({ field }) => <TextField { ...field } id="Link" placeholder="Link" /> }/>
        </Col>
        <Col className="col-2">
          <Select onChange={ miField.onChange } label="Metro Area" value={ miField.value }>
            { metroItems }
          </Select>
        </Col>
        <Col className="col-2">
          <Select onChange={ ciField.onChange } label="City Area" value={ ciField.value }>
            { cityItems }
          </Select>
        </Col>
      </Row>
      <Row>
        <Col>
          <Controller name="Address" control={control} render={({ field }) => <TextField { ...field } id="Address" placeholder="Address" /> }/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Controller name="ElementarySchoolScore" control={control} render={({ field }) => <TextField { ...field } id="ElementarySchoolScore" placeholder="Elementary School Score" type="number" /> }/>
        </Col>
        <Col>
          <Controller name="MiddleSchoolScore" control={control} render={({ field }) => <TextField { ...field } id="MiddleSchoolScore" placeholder="Middle School Score" type="number" /> }/>
        </Col>
        <Col>
          <Controller name="HighSchoolScore" control={control} render={({ field }) => <TextField { ...field } id="HighSchoolScore" placeholder="High School Score" type="number" /> }/>
        </Col>
        <Col>
          <Controller name="MinimumValue" control={control} render={({ field }) => <TextField { ...field } id="MinimumValue" placeholder="Minimum Value" type="number" /> }/>
        </Col>
        <Col>
          <Controller name="MaximumValue" control={control} render={({ field }) => <TextField { ...field } id="MaximumValue" placeholder="Maximum Value" type="number" /> }/>
        </Col>
        <Col>
          <Controller name="MinSqft" control={control} render={({ field }) => <TextField { ...field } id="MinSqft" placeholder="Minimum Sq. Ft." type="number" /> }/>
        </Col>
        <Col>
          <Controller name="MaxSqft" control={control} render={({ field }) => <TextField { ...field } id="MaxSqft" placeholder="Maximum Sq. Ft." type="number" /> }/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Controller name="Notes" control={control} render={({ field }) => <TextField { ...field } id="Notes" placeholder="Notes" multiline rows={ 10 } /> }/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="contained" onClick={ handleSubmit(onSubmit) } type="submit">Submit</Button>
        </Col>
      </Row>
    </FormsPage>
  );
});
