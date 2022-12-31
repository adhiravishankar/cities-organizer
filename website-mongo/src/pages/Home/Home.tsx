import { observer } from 'mobx-react-lite';
import { Fragment, useCallback } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import { ImageList } from '../../common/hooks/ImageList';
import { LabeledImageItem } from '../../common/hooks/LabeledImageItem';
import { NavBar } from '../../common/hooks/NavBar';
import { Metro } from '../../common/interfaces/Metro';
import { AppStore } from '../../common/stores/AppStore';
import { CitiesTable } from './CitiesTable';
import { MetrosTable } from './MetrosTable';
import { NeighborhoodsTable } from './NeighborhoodsTable';

export interface HomePageProps {
  store: AppStore;
}

export const Home = observer<HomePageProps>((props: HomePageProps) => {
  const { store } = props;

  const metrosJSX: JSX.Element[] = [];
  const navigation = useNavigate();
  const onClickHandler = useCallback((id: string) => navigation('/metros/' + id), []);

  store.metrosMap.forEach((metro: Metro) => {
    const { ID, FeaturedImage, Name } = metro;
    metrosJSX.push(<LabeledImageItem onClick={ onClickHandler } id={ ID } name={ Name } source={ FeaturedImage } />);
  });

  return (
    <Fragment>
      <NavBar editIcon={ false } name="Metros" />
      <Container className="body-container images-grid">
        <Tabs
          defaultActiveKey="metros"
          id="home-page-tabs"
          className="mb-3"
          justify
        >
          <Tab eventKey="metros" title="Metros">
            <ImageList columns={ 3 }>{ metrosJSX }</ImageList>
          </Tab>
          <Tab eventKey="metros-table" title="Metros Table">
            <MetrosTable store={ store } />
          </Tab>
          <Tab eventKey="cities-table" title="Cities Table">
            <CitiesTable store={ store } />
          </Tab>
          <Tab eventKey="neighborhoods-table" title="Neighborhoods Table">
            <NeighborhoodsTable store={ store } />
          </Tab>
        </Tabs>
      </Container>
    </Fragment>
  );
});
