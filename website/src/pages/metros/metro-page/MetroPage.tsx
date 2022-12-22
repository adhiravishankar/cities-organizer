import {Box, Container, Modal } from '@mui/material';
import { Fragment, useCallback } from 'react';
import { useParams } from 'react-router';

import { Metro } from '../../../interfaces/Metro';
import { NavBar } from '../../../layouts/NavBar';
import { AppStore } from '../../../stores/AppStore';
import { EditMetro } from './EditMetro';
import {observer} from "mobx-react-lite";
import {AddPics} from "./AddPics";

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
  const params = useParams<MetroParams>();
  const metro = props.store.metrosMap.get(Number.parseInt(params.metro));

  const openEditingScreen = useCallback(() => {
    props.store.modalOpen = true;
  }, [props.store]);

  const editMetro = useCallback((newMetro: Metro) => {
    props.store.editMetro(newMetro.ID, newMetro.Name, newMetro.ExtendedName, newMetro.Population);
  }, [props.store]);

  const fileUpload = useCallback((file: File) => {
    console.log('file upload 2');
    props.store.uploadPicForMetro(metro.ID, file);
  }, [props.store, metro]);

  return (
    <Fragment>
      <NavBar editIcon={ true } id={ metro.ID } onEdit={ openEditingScreen } name={ metro.Name } />
      <Container>
        
      </Container>
      <Modal open={ props.store.modalOpen }>
        <Box sx={ metroPopupStyle }>
          <EditMetro metro={ metro } editMetro={ editMetro } />
        </Box>
      </Modal>
      <Modal open={ true }>
        <AddPics fileUpload={ fileUpload } />
      </Modal>
    </Fragment>
  );
});
