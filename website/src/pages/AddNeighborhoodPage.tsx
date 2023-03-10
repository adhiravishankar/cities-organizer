import { TextField } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Controller, useController, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Select from 'react-select';
import { useContainer } from 'unstated-next';

import { FormsPage } from '../hooks/FormsPage';
import { DropdownOption } from '../interfaces/DropdownOption';
import { Neighborhood } from '../interfaces/Neighborhood';
import { SelectedOption } from '../interfaces/SelectedOption';
import { CitiesContainer } from '../stores/CitiesStore';
import { MetrosContainer } from '../stores/MetrosStore';
import { NeighborhoodsContainer } from '../stores/NeighborhoodsStore';

export const AddNeighborhoodPage = () => {
  const MetrosStore = useContainer(MetrosContainer);
  const CitiesStore = useContainer(CitiesContainer);
  const NeighborhoodsStore = useContainer(NeighborhoodsContainer);

  const { handleSubmit, control } = useForm<Neighborhood>();
  const navigation = useNavigate();

  const onSubmit = useCallback(async (data: Neighborhood) => {
    await NeighborhoodsStore.insertNeighborhood(data);
    navigation('/');
  }, []);

  const { field: ciField } = useController({ name: 'CityID', control });
  const { field: miField } = useController({ name: 'MetroID', control });

  const onSetMetro = useCallback((option: SelectedOption) => {
    MetrosStore.setSelectedMetroArea(option.value);
    miField.onChange(-1);
    miField.onChange(option.value);
  }, []);

  const onSetCity = useCallback((option: SelectedOption) => {
    ciField.onChange(-1);
    ciField.onChange(option.value);
  }, []);

  useEffect(() => miField.onChange(MetrosStore.selectedMetroArea));
  useEffect(() => ciField.onChange(CitiesStore.selectedCityArea));

  const metroItems: DropdownOption[] = [];
  MetrosStore.metroNamesMap.forEach((text: string, id: string) => metroItems.push({ value: id, label: text }));

  const cityItems: DropdownOption[] = [];
  CitiesStore.filteredCitiesMap.forEach((text: string, id: string) => cityItems.push({ value: id, label: text }));

  return (
    <FormsPage title="Add Neighborhood">
      <Row>
        <Col>
          <Controller name="Name" control={control} render={({ field }) => <TextField { ...field } fullWidth id="name" placeholder="Name" /> }/>
        </Col>
        <Col>
          <Controller name="Link" control={control} render={({ field }) => <TextField { ...field } fullWidth id="Link" placeholder="Link" /> }/>
        </Col>
        <Col className="col-2">
          <Select options={ metroItems } classNames={{ control: () => 'dropdown' }} onChange={ onSetMetro } />
        </Col>
        <Col className="col-2">
          <Select options={ cityItems } classNames={{ control: () => 'dropdown' }} onChange={ onSetCity } />
        </Col>
      </Row>
      <Row>
        <Col>
          <Controller name="Address" control={control} render={({ field }) => <TextField { ...field } fullWidth id="Address" placeholder="Address" /> }/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Controller name="ElementarySchoolScore" control={control} render={({ field }) => <TextField { ...field } fullWidth id="ElementarySchoolScore" placeholder="Elementary School Score" type="number" /> }/>
        </Col>
        <Col>
          <Controller name="MiddleSchoolScore" control={control} render={({ field }) => <TextField { ...field } fullWidth id="MiddleSchoolScore" placeholder="Middle School Score" type="number" /> }/>
        </Col>
        <Col>
          <Controller name="HighSchoolScore" control={control} render={({ field }) => <TextField { ...field } fullWidth id="HighSchoolScore" placeholder="High School Score" type="number" /> }/>
        </Col>
        <Col>
          <Controller name="MinimumValue" control={control} render={({ field }) => <TextField { ...field } fullWidth id="MinimumValue" placeholder="Minimum Value" type="number" /> }/>
        </Col>
        <Col>
          <Controller name="MaximumValue" control={control} render={({ field }) => <TextField { ...field } fullWidth id="MaximumValue" placeholder="Maximum Value" type="number" /> }/>
        </Col>
        <Col>
          <Controller name="MinSqft" control={control} render={({ field }) => <TextField { ...field } fullWidth id="MinSqft" placeholder="Minimum Sq. Ft." type="number" /> }/>
        </Col>
        <Col>
          <Controller name="MaxSqft" control={control} render={({ field }) => <TextField { ...field } fullWidth id="MaxSqft" placeholder="Maximum Sq. Ft." type="number" /> }/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Controller name="Notes" control={control} render={({ field }) => <TextField { ...field } fullWidth id="Notes" placeholder="Notes" multiline rows={ 10 } /> }/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="contained" onClick={ handleSubmit(onSubmit) } type="submit">Submit</Button>
        </Col>
      </Row>
    </FormsPage>
  );
};
