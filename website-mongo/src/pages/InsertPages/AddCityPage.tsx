import { MenuItem, Select, TextField } from '@mui/material';
import { useCallback } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Controller, useController, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

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

  const metroItems: JSX.Element[] = [];
  store.metroNamesMap.forEach((text: string, id: string) =>
    metroItems.push(<MenuItem key={ id } value={ id }>{ text }</MenuItem>));

  return (
    <FormsPage title="Add City">
      <Row>
        <Col>
          <Controller name="Name" control={control} render={({ field }) => <TextField { ...field } fullWidth id="name" placeholder="Name" /> }/>
        </Col>
        <Col>
          <Controller name="Population" control={control} render={({ field }) => <TextField { ...field } fullWidth id="population" placeholder="Population" type="number" /> }/>
        </Col>
        <Col className="col-2">
          <Select onChange={ miField.onChange } label="Metro Area" value={ miField.value }>
            { metroItems }
          </Select>
        </Col>
      </Row>
      <Row>
        <Col>
          <Controller name="Notes" control={control} render={({ field }) => <TextField { ...field } fullWidth id="Notes" placeholder="Notes" multiline rows={ 10 } /> }/>
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
