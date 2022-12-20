import { Container } from '@mui/material';
import { Fragment, useCallback } from 'react';
import { useParams } from 'react-router';

import { NavBar } from '../../layouts/NavBar';
import { AppStore } from '../../stores/AppStore';

type MetroParams = {
  metro: string;
};

interface MetroProps {
  store: AppStore;
}

export function MetroPage(props: MetroProps) {
  const params = useParams<MetroParams>();
  const metro = props.store.metrosMap.get(Number.parseInt(params.metro));

  const editMetro = useCallback((id: number) => {

  }, []);

  return (
    <Fragment>
      <NavBar editIcon={ true } id={ metro.ID } onEdit={ editMetro } name={ metro.Name } />
      <Container>
        
      </Container>
    </Fragment>
  );
}
