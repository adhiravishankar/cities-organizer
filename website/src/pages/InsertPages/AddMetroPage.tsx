import { Button, TextField } from '@mui/material';
import { useCallback } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { FormsPage } from '../../common/hooks/FormsPage';
import { Metro } from '../../common/interfaces/Metro';
import { AppStore } from '../../common/stores/AppStore';

export interface AddMetroPageProps {
  store: AppStore;
}

export function AddMetroPage(props: AddMetroPageProps) {
  const { store } = props;
  const { handleSubmit, control } = useForm<Metro>();

  const navigation = useNavigate();

  const onSubmit = useCallback(async (data: Metro) => {
    await store.insertMetro(data.Name, data.ExtendedName, data.ShortName, data.MetroSizeRank, data.Population, data.FeaturedImage, data.Notes);
    navigation('/');
  }, [store]);

  return (
    <FormsPage title="Add Metro">
      <Row>
        <Col>
          <Controller name="Name" control={control} render={({ field }) => <TextField { ...field } fullWidth id="name" label="Name" placeholder="Name" /> }/>
        </Col>
        <Col>
          <Controller name="ExtendedName" control={control} render={({ field }) => <TextField { ...field } fullWidth id="extended_name" label="Extended Name" placeholder="Extended Name" /> }/>
        </Col>
        <Col className="col-2">
          <Controller name="ShortName" control={control} render={({ field }) => <TextField { ...field } id="short_name" fullWidth placeholder="Short Name" inputProps={ { maxLength: 3 } } /> }/>
        </Col>
        <Col className="col-2">
          <Controller name="Population" control={control} render={({ field }) => <TextField { ...field } fullWidth id="population" label="Population" placeholder="Population" type="number" /> }/>
        </Col>
        <Col className="col-2">
          <Controller name="MetroSizeRank" control={control} render={({ field }) => <TextField { ...field } fullWidth id="MetroSizeRank" label="Metro Size Rank" placeholder="Metro Size Rank" type="number" /> }/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Controller name="Notes" control={control} render={({ field }) => <TextField { ...field } id="Notes" label="Notes" placeholder="Notes" multiline fullWidth rows={ 10 } /> }/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="contained" onClick={ handleSubmit(onSubmit) } type="submit">Submit</Button>
        </Col>
      </Row>
    </FormsPage>
  );
}
