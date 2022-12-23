import { observer } from 'mobx-react-lite';
import { Fragment, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import { NavBar } from '../../layouts/NavBar';
import { AppStore } from '../../stores/AppStore';
import { MetroList } from './MetroList';

export interface MetrosPageProps {
  store: AppStore;
}

export const MetrosPage = observer<MetrosPageProps>((props: MetrosPageProps) => {
  const { store } = props;

  useEffect(() => {
    store.fetchMetros();
  }, [store]);

  return (
    <Fragment>
      <NavBar editIcon={ false } name="Metros" />
      <Container>
        <MetroList store={ store } />
      </Container>
    </Fragment>
  );
});
