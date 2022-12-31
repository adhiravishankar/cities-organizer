import { Neighborhood } from './Neighborhood';

export interface DetailedNeighborhood extends Neighborhood {

  Neighborhood: Neighborhood;

  Pics: string[];
}
