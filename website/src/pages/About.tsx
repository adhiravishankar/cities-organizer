import { Card, CardContent } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { SWRResponse } from 'swr';

import { API } from '../apis/API';
import { DetailsList } from '../hooks/DetailsList';
import { NavBar } from '../hooks/NavBar';

export function About() {
  const api = new API();
  const aboutMap = new Map<string, string>();

  useEffect(() => {
    api.about().then((response: SWRResponse) => {
      const data = response.data as { [key: string]: string };
      Object.entries(data).forEach(([key, value]) => aboutMap.set(key, value));
      aboutMap.set('Frontend', 'React');
      aboutMap.set('Store', 'MobX');
      aboutMap.set('Router', 'React Router');
      aboutMap.set('Styling Frameworks', 'Bootstrap & Material UI');
    });
  }, []);

  return (
    <Fragment>
      <NavBar editIcon={false} name="About"/>
      <Container className="body-container images-grid">
        <Card>
          <CardContent>
            <h4>About</h4>
            <DetailsList data={aboutMap}/>
          </CardContent>
        </Card>
      </Container>
    </Fragment>
  );
}
