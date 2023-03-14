import { City } from './City';
import { Metro } from './Metro';
import { Neighborhood } from './Neighborhood';


export interface DetailedMetro {

  Metropolitan: Metro;

  Pics: string[];

  Cities: City[];

  Neighborhoods: Neighborhood[];
}
