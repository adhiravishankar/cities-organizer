import { Card, CardContent } from '@mui/material';
import { Fragment } from 'react';
import { Container } from 'react-bootstrap';

import { DetailsList } from '../common/hooks/DetailsList';
import { NavBar } from '../common/hooks/NavBar';
import { AppStore } from '../common/stores/AppStore';

interface AboutProps {
  store: AppStore;
}

export function About(props: AboutProps) {
  return (
    <Fragment>
      <NavBar editIcon={ false } name="About" />
      <Container className="body-container images-grid">
        <Card>
          <CardContent>
            <h4>About</h4>
            <DetailsList data={ props.store.aboutMap } />
          </CardContent>
        </Card>
      </Container>
    </Fragment>
  );
}
