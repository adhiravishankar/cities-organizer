import { Breadcrumb, Row } from 'react-bootstrap';


export interface BreadcrumbsProps {

  metro?: string;

  city?: string;
  
  neighborhood?: string;

  metroID?: string;

  cityID?: string;

  neighborhoodID?: string;

  active: 'neighborhood' | 'city' | 'metro';

}

export function Breadcrumbs(props: BreadcrumbsProps) {
  const { active, cityID, metroID, neighborhoodID, metro, city, neighborhood } = props;

  const breadcrumbs: JSX.Element[] = [];
  const homeBreadcrumb = <Breadcrumb.Item href="/"><i className="fas fa-house" /></Breadcrumb.Item>;
  breadcrumbs.push(homeBreadcrumb);

  if (!(metro === null || metro === undefined || metro === '')) {
    breadcrumbs.push(<Breadcrumb.Item href={`/metros/${ metroID }`}>{ metro }</Breadcrumb.Item>);
  }

  if (!(city === null || city === undefined || city === '')) {
    breadcrumbs.push(<Breadcrumb.Item href={`/cities/${ cityID }`}>{ city }</Breadcrumb.Item>);
  }

  if (!(neighborhood === null || neighborhood === undefined || neighborhood === '')) {
    breadcrumbs.push(<Breadcrumb.Item href={`/neighborhoods/${ neighborhoodID }`}>{ neighborhood }</Breadcrumb.Item>);
  }

  return (
    <Breadcrumb>
      { breadcrumbs }
    </Breadcrumb>
  );

}
