import { useParams } from 'react-router';
import { AppStore } from '../../stores/AppStore';
import {Fragment, useCallback, useEffect} from 'react';
import { NavBar } from '../../layouts/NavBar';

type MetroParams = {
  metro: string;
};

interface MetroProps {
  store: AppStore;
}

export function MetroPage(props: MetroProps) {
  const params = useParams<MetroParams>();
  const metro = props.store.metrosMap.get(Number.parseInt(params.metro));

  const editMetro = useCallback((id: number) => {

  }, []);

  return (
    <Fragment>
      <NavBar editIcon={ true } id={ metro.ID } onEdit={ editMetro } name={ metro.Name } />
    </Fragment>
  );
}
