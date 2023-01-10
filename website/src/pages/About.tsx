import { AppStore } from '../common/stores/AppStore';
import {NavBar} from "../common/hooks/NavBar";
import {Container} from "react-bootstrap";
import {Box, ImageList, Paper, Tab, Tabs} from "@mui/material";
import {tabProps} from "../common/hooks/tabProps";
import {TabPanel} from "../common/hooks/TabPanel";
import {MetrosTable} from "./Home/MetrosTable";
import {CitiesTable} from "./Home/CitiesTable";
import {NeighborhoodsTable} from "./Home/NeighborhoodsTable";
import {Fragment} from "react";

interface AboutProps {
  store: AppStore;
}

export function About(props: AboutProps) {
  return (
    <Fragment>
      <NavBar editIcon={ false } name="About" />
      <Container className="body-container images-grid">
        <Paper>{ [...props.store.aboutMap.entries()] }</Paper>
      </Container>
    </Fragment>
  );
}
