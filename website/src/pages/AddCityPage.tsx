import { TextField } from '@mui/material';
import { useCallback } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Controller, useController, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Select from 'react-select';
import { useContainer } from 'unstated-next';

import { FormsPage } from '../hooks/FormsPage';
import { City } from '../interfaces/City';
import { DropdownOption } from '../interfaces/DropdownOption';
import { SelectedOption } from '../interfaces/SelectedOption';
import { AppStore } from '../stores/AppStore';
import { MetrosContainer } from '../stores/MetrosStore';


export interface AddCityPageProps {
  store: AppStore;
}

export function AddCityPage(props: AddCityPageProps) {
  const MetrosStore = useContainer(MetrosContainer);

  const { store } = props;
  const navigation = useNavigate();

  const { handleSubmit, control } = useForm<City>();

  const onSubmit = useCallback(async (data: City) => {
    await store.insertCity(data.Name, data.MetroID, data.Population, data.FeaturedImage, data.Notes);
    navigation('/');
  }, [store]);

  const { field: miField } = useController({ name: 'MetroID', control });

  const onSetMetro = useCallback((option: SelectedOption) => {
    MetrosStore.setSelectedMetroArea(option.value);
    miField.onChange(-1);
    miField.onChange(MetrosStore.selectedMetroArea);
  }, []);


  const metroItems: DropdownOption[] = [];
  MetrosStore.metroNamesMap.forEach((text: string, id: string) => metroItems.push({ value: id, label: text }));

  return (
    <FormsPage title="Add City">
      <Row>
        <Col>
          <Controller name="Name" control={control} render={({ field }) => <TextField { ...field } fullWidth id="name" placeholder="Name" /> }/>
        </Col>
        <Col className="col-2">
          <Controller name="Population" control={control} render={({ field }) => <TextField { ...field } fullWidth id="population" placeholder="Population" type="number" /> }/>
        </Col>
        <Col className="col-3">
          <Select options={ metroItems } classNames={{ control: () => 'dropdown' }} onChange={ onSetMetro } />
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
