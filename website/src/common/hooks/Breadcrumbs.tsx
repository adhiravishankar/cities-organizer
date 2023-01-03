import { Paper } from '@mui/material';
import { Breadcrumb } from 'react-bootstrap';


export interface BreadcrumbsProps {

  metro?: string;

  city?: string;
  
  neighborhood?: string;

  metroID?: string;

  cityID?: string;

  neighborhoodID?: string;

  active: 'insertion' | 'neighborhood' | 'city' | 'metro';

  insertionText?: string;
}

export function Breadcrumbs(props: BreadcrumbsProps) {
  const { active, cityID, metroID, neighborhoodID, metro, city, neighborhood, insertionText } = props;

  const breadcrumbs: JSX.Element[] = [];
  const homeBreadcrumb = <Breadcrumb.Item href="/"><i className="fas fa-house" /></Breadcrumb.Item>;
  breadcrumbs.push(homeBreadcrumb);

  if (active === 'insertion') {
    breadcrumbs.push(<Breadcrumb.Item active>{ insertionText }</Breadcrumb.Item>);
  } else {
    if (!(metro === null || metro === undefined || metro === '')) {
      breadcrumbs.push(<Breadcrumb.Item active={active === 'metro'}
                                        href={`/metros/${metroID}`}>{metro}</Breadcrumb.Item>);
    }

    if (!(city === null || city === undefined || city === '')) {
      breadcrumbs.push(<Breadcrumb.Item active={active === 'city'} href={`/cities/${cityID}`}>{city}</Breadcrumb.Item>);
    }

    if (!(neighborhood === null || neighborhood === undefined || neighborhood === '')) {
      breadcrumbs.push(<Breadcrumb.Item active={active === 'neighborhood'}
                                        href={`/neighborhoods/${neighborhoodID}`}>{neighborhood}</Breadcrumb.Item>);
    }
  }

  return (
    <Paper className="breadcrumbs">
      <Breadcrumb>
        { breadcrumbs }
      </Breadcrumb>
    </Paper>
  );

}
