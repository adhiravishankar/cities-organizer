import { useCallback } from 'react';
import {Button, DropdownButton, Form, Row} from 'react-bootstrap';
import { Controller, useController, useForm } from 'react-hook-form';

import { Metro } from '../../interfaces/Metro';
import DropdownItem from "react-bootstrap/DropdownItem";


export interface EditMetroProps {
  metro: Metro;

  editMetro: (metro: Metro) => void;

  pics: string[];
}

export function EditMetro(props: EditMetroProps) {
  const { editMetro, metro } = props;

  const { handleSubmit, control } = useForm<Metro>({ defaultValues: props.metro });

  const onSubmit = useCallback((data: Metro) => {
    editMetro(data);
  }, [editMetro]);

  const { field: featuredImageField } = useController({ name: 'FeaturedImage', control });

  return (
    <form>
      <Row>
        <h4 style={{ marginBottom: '1rem' }}>{`Edit ${ metro.Name }`}</h4>
        <Controller name="Name" control={control} render={({ field }) => <Form.Control { ...field } id="name" placeholder="Name" /> }/>
        <Controller name="ExtendedName" control={control} render={({ field }) => <Form.Control { ...field } id="extended_name" placeholder="Extended Name" /> }/>
        <Controller name="Population" control={control} render={({ field }) => <Form.Control { ...field } id="population" placeholder="Population" type="number" /> }/>

        <Button onClick={ handleSubmit(onSubmit) } type="submit">Submit</Button>
      </Row>
    </form>
  );
}
