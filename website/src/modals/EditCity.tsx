import { MenuItem, Select, TextField } from '@mui/material';
import { useCallback } from 'react';
import { Button, Modal, Stack } from 'react-bootstrap';
import { Controller, useController, useForm } from 'react-hook-form';

import { UseBooleanOutput } from '../functions/UseBooleanOutput';
import { City } from '../interfaces/City';
import {useContainer} from "unstated-next";
import {CitiesContainer} from "../stores/CitiesStore";


export interface EditCityProps {
  id: string;

  open: UseBooleanOutput;
}

export const EditCity = (props: EditCityProps) => {
  const CitiesStore = useContainer(CitiesContainer);
  const { id, open } = props;

  const { handleSubmit, control } = useForm<City>({ defaultValues: CitiesStore.selectedCity.City });

  const onSubmit = useCallback((data: City) => {
    CitiesStore.updateCity(data.ID, data.Name, data.Population, data.FeaturedImage, data.Notes);
    open.setFalse();
  }, [id]);

  const { field: fiField } = useController({ name: 'FeaturedImage', control });

  const picsJSX: JSX.Element[] = [];
  CitiesStore.selectedCity.Pics.forEach((text: string) =>
    picsJSX.push(<MenuItem key={ text } value={ text }>{ text }</MenuItem>));

  return (
    <Modal show={ open.value } onHide={ open.setFalse }>
      <Modal.Header closeButton>
        <Modal.Title>{`Edit ${ CitiesStore.selectedCity.City.Name }`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <Stack direction="vertical" gap={ 2 }>
            <Controller name="Name" control={control} render={({ field }) => <TextField { ...field } id="name" placeholder="Name" /> }/>
            <Controller name="Population" control={control} render={({ field }) => <TextField { ...field } id="population" placeholder="Population" type="number" /> }/>
            <Select onChange={ fiField.onChange } value={ fiField.value } label="Featured Image">{ picsJSX }</Select>
            <Button variant="contained" onClick={ handleSubmit(onSubmit) } type="submit">Submit</Button>
          </Stack>
        </form>
      </Modal.Body>
    </Modal>
  );
};
