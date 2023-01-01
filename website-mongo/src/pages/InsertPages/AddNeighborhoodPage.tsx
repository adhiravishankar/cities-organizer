import { TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Controller, useController, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { FormsPage } from '../../common/hooks/FormsPage';
import { Neighborhood } from '../../common/interfaces/Neighborhood';
import { AppStore } from '../../common/stores/AppStore';
import Select from "react-select";
import { DropdownOption } from '../../common/interfaces/DropdownOption';

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

  const metroItems: DropdownOption[] = [];
  store.metroNamesMap.forEach((text: string, id: string) => metroItems.push({ value: id, label: text }));

  const cityItems: DropdownOption[] = [];
  store.filteredCitiesMap.forEach((text: string, id: string) => cityItems.push({ value: id, label: text }));

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
          <Select options={ metroItems } classNames={{ control: () => 'dropdown' }} />
        </Col>
        <Col className="col-2">
          <Select options={ cityItems } classNames={{ control: () => 'dropdown' }} />
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
});
