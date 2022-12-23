import { useCallback } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';

import { Metro } from '../../interfaces/Metro';


export interface EditMetroProps {
  metro: Metro;

  editMetro: (metro: Metro) => void;
}

export function EditMetro(props: EditMetroProps) {
  const { editMetro, metro } = props;

  const { handleSubmit, control } = useForm<Metro>({ defaultValues: props.metro });

  const onSubmit = useCallback((data: Metro) => {
    editMetro(data);
  }, [editMetro]);

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
