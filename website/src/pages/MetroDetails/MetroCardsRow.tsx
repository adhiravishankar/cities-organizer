import { Col, Row } from 'react-bootstrap';
import { ReactNumberCard } from 'react-number-card';

import { attachOrdinal } from '../../common/functions/getOrdinal';
import { DetailedMetro } from '../../common/interfaces/DetailedMetro';

export interface MetroCardsRowProps {
  selectedMetro: DetailedMetro;
}

export const MetroCardsRow = (props: MetroCardsRowProps) => {
  const { selectedMetro } = props;
  const { Cities, Metropolitan, Neighborhoods, Pics } = selectedMetro;
  const { MetroSizeRank, Population } = Metropolitan;
  return (
    <Row>
      <Col>
        <ReactNumberCard numberText={ attachOrdinal(MetroSizeRank) } labelText="Metropolitan Size" color="#283593" />
      </Col>
      <Col>
        <ReactNumberCard numberText={ Population.toLocaleString() } labelText="Population" color="#2E7D32" />
      </Col>
      <Col className="col-1">
        <ReactNumberCard numberText={ Neighborhoods.length } labelText="Neighborhoods" color="#EF6C00" />
      </Col>
      <Col className="col-1">
        <ReactNumberCard numberText={ Cities.length } labelText="Cities" color="#AD1457" />
      </Col>
      <Col className="col-1">
        <ReactNumberCard numberText={ Pics.length } labelText="Pics" color="#C62828" />
      </Col>
    </Row>
  );

};

