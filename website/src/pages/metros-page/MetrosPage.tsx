import { observer } from 'mobx-react-lite';
import { Fragment, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import { ImageList } from '../../components/ImageList';
import { LabeledImageItem } from '../../components/LabeledImageItem';
import { Metro } from '../../interfaces/Metro';
import { NavBar } from '../../layouts/NavBar';
import { AppStore } from '../../stores/AppStore';

export interface MetrosPageProps {
  store: AppStore;
}

export const MetrosPage = observer<MetrosPageProps>((props: MetrosPageProps) => {
  const { store } = props;

  const metrosJSX: JSX.Element[] = [];
  const navigation = useNavigate();
  const onClickHandler = useCallback((id: number) => navigation('/metros/' + id), []);

  store.metrosMap.forEach((metro: Metro) => {
    const { ID, FeaturedImage, Name } = metro;
    metrosJSX.push(<LabeledImageItem onClick={ onClickHandler } id={ ID } name={ Name } source={ FeaturedImage } />);
  });

  return (
    <Fragment>
      <NavBar editIcon={ false } name="Metros" />
      <Container className="body-container images-grid">
        <ImageList columns={ 3 }>{ metrosJSX }</ImageList>
      </Container>
    </Fragment>
  );
});
