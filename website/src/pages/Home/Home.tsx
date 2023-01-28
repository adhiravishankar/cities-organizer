import { Box, ImageList, ImageListItem, Paper, Tab, Tabs } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Fragment, SyntheticEvent, useCallback, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import { LabeledImageItem } from '../../common/hooks/LabeledImageItem';
import { NavBar } from '../../common/hooks/NavBar';
import { TabPanel } from '../../common/hooks/TabPanel';
import { tabProps } from '../../common/hooks/tabProps';
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

  const [index, setIndex] = useState(0);

  const setTabIndex = (event: SyntheticEvent, newValue: number) => {
    setIndex(newValue);
  };

  store.metrosMap.forEach((metro: Metro) => {
    const { ID, FeaturedImage, Name } = metro;
    metrosJSX.push(
      <ImageListItem key={ ID }>
        <LabeledImageItem onClick={ onClickHandler } id={ ID } name={ Name } source={ FeaturedImage } />
      </ImageListItem>,
    );
  });

  return (
    <Fragment>
      <NavBar editIcon={ false } name="Metros" />
      <Container className="body-container images-grid">
        <Paper>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={index} onChange={setTabIndex} aria-label="basic tabs example">
              <Tab label="Metros" {...tabProps(0)} />
              <Tab label="Metros Table" {...tabProps(1)} />
              <Tab label="Cities Table" {...tabProps(2)} />
              <Tab label="Neighborhoods Table" {...tabProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={index} index={0}>
            <ImageList cols={ 5 }>{ metrosJSX }</ImageList>
          </TabPanel>
          <TabPanel value={index} index={1}>
            <MetrosTable store={ store } />
          </TabPanel>
          <TabPanel value={index} index={2}>
            <CitiesTable store={ store } />
          </TabPanel>
          <TabPanel value={index} index={3}>
            <NeighborhoodsTable store={ store } />
          </TabPanel>
        </Paper>
      </Container>
    </Fragment>
  );
});
