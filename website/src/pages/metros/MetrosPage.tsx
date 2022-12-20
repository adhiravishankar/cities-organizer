import { AppStore } from '../../stores/AppStore';
import { Fragment, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Breadcrumbs, Container, Grid, Paper } from '@mui/material';
import { NavBar } from '../../layouts/NavBar';

export interface MetrosPageProps {
  store: AppStore;
}

export const MetrosPage = observer<MetrosPageProps>((props: MetrosPageProps) => {
  useEffect(() => {
    props.store.fetchMetros();
  }, [props.store]);

  return (
    <Fragment>
      <NavBar name="Metros" />
      <Container>
        <Grid container>
          <Paper>
            <Breadcrumbs>

            </Breadcrumbs>
          </Paper>
        </Grid>
      </Container>
    </Fragment>
  );
});
