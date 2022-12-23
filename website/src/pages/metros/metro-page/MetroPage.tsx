import {Box, Card, CardContent, CardHeader, Container, Grid, ImageList, ImageListItem, Modal} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Fragment, useCallback } from 'react';
import { useParams } from 'react-router';

import { Metro } from '../../../interfaces/Metro';
import { NavBar } from '../../../layouts/NavBar';
import { AppStore } from '../../../stores/AppStore';
import { AddPics } from './AddPics';
import { EditMetro } from './EditMetro';
import {ImageItem} from "../../../components/ImageItem";

type MetroParams = {
  metro: string;
};

interface MetroProps {
  store: AppStore;
}

const metroPopupStyle = {
  width: '20rem',
  height: '20rem',
  bgcolor: 'white',
  transform: 'translate(-50%, -50%)',
  p: '1rem',
  position: 'absolute' as 'absolute',
  border: '0.1rem solid #000',
  borderRadius: 2,
  boxShadow: 24,
  top: '50%',
  left: '50%',
};

export const MetroPage = observer<MetroProps>((props: MetroProps) => {
  const { store } = props;
  const params = useParams<MetroParams>();
  const metro = store.metrosMap.get(Number.parseInt(params.metro));

  const openEditingScreen = useCallback(() => {
    store.modalOpen = true;
  }, [store]);

  const editMetro = useCallback((newMetro: Metro) => {
    store.editMetro(newMetro.ID, newMetro.Name, newMetro.ExtendedName, newMetro.Population);
  }, [store]);

  const fileUpload = useCallback((file: File) => {
    store.uploadPicForMetro(metro.ID, file);
  }, [store, metro]);

  const picsJSX = store.pics.map((pic: string) => <ImageItem source={ pic } name={ pic } />);

  return (
    <Fragment>
      <NavBar editIcon={ true } id={ metro.ID } onEdit={ openEditingScreen } name={ metro.Name } />
      <Container>
        <Card>
          <CardHeader title="Images" />
          <CardContent>
            <ImageList cols={ 2 }>{ picsJSX }</ImageList>
          </CardContent>
        </Card>
      </Container>
      <Modal open={ store.modalOpen }>
        <Box sx={ metroPopupStyle }>
          <EditMetro metro={ metro } editMetro={ editMetro } />
        </Box>
      </Modal>
      <Modal open={ store.imagesUploadModalOpen }>
        <AddPics fileUpload={ fileUpload } />
      </Modal>
    </Fragment>
  );
});
