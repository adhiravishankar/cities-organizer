import { City } from './City';
import { Neighborhood } from './Neighborhood';

export interface DetailedCity extends City {
  Pics: string[]
  
  Neighborhoods: Neighborhood[]
}
