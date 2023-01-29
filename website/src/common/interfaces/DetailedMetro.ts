import { City } from './City';
import { Employer } from './Employer';
import { Metro } from './Metro';
import { Neighborhood } from './Neighborhood';


export interface DetailedMetro {

  Metropolitan: Metro;

  Pics: string[];

  Cities: City[];

  Neighborhoods: Neighborhood[];

  Friends: Employer[];
}
