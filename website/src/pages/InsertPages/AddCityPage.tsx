import { TextField } from '@mui/material';
import { useCallback } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Controller, useController, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Select from 'react-select';

import { FormsPage } from '../../common/hooks/FormsPage';
import { City } from '../../common/interfaces/City';
import { DropdownOption } from '../../common/interfaces/DropdownOption';
import { SelectedOption } from '../../common/interfaces/SelectedOption';
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

  const onSetMetro = useCallback((option: SelectedOption) => {
    store.updateSelectedMetro(option.value);
    miField.onChange(-1);
    miField.onChange(store.selectedMetroArea);
  }, []);


  const metroItems: DropdownOption[] = [];
  store.metroNamesMap.forEach((text: string, id: string) => metroItems.push({ value: id, label: text }));

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
