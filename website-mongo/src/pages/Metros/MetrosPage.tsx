import { observer } from 'mobx-react-lite';
import { Fragment, useCallback } from 'react';
import {Container, Tab, Tabs} from 'react-bootstrap';
import { useNavigate } from 'react-router';

import { ImageList } from '../../common/hooks/ImageList';
import { LabeledImageItem } from '../../common/hooks/LabeledImageItem';
import { NavBar } from '../../common/hooks/NavBar';
import { Metro } from '../../common/interfaces/Metro';
import { AppStore } from '../../common/stores/AppStore';
import {MetrosTable} from "./MetrosTable";

export interface MetrosPageProps {
  store: AppStore;
}

export const MetrosPage = observer<MetrosPageProps>((props: MetrosPageProps) => {
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
          defaultActiveKey="profile"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="metros" title="Metros">
            <ImageList columns={ 3 }>{ metrosJSX }</ImageList>
          </Tab>
          <Tab eventKey="metros-table" title="Metros Table">
            <MetrosTable store={ store } />
          </Tab>
          <Tab eventKey="longer-tab" title="Loooonger Tab">

          </Tab>
          <Tab eventKey="contact" title="Contact" disabled>

          </Tab>
        </Tabs>
      </Container>
    </Fragment>
  );
});
