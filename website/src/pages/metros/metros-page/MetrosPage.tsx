import { Container } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Fragment, useEffect } from 'react';

import { NavBar } from '../../../layouts/NavBar';
import { AppStore } from '../../../stores/AppStore';
import { MetroList } from './MetroList';

export interface MetrosPageProps {
  store: AppStore;
}

export const MetrosPage = observer<MetrosPageProps>((props: MetrosPageProps) => {
  useEffect(() => {
    props.store.fetchMetros();
  }, [props.store]);

  return (
    <Fragment>
      <NavBar editIcon={ false } name="Metros" />
      <Container>
        <MetroList store={ props.store } />
      </Container>
    </Fragment>
  );
});
