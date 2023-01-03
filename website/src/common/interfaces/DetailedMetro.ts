import { City } from './City';
import { Friend } from './Friend';
import { Metro } from './Metro';
import { Neighborhood } from './Neighborhood';


export interface DetailedMetro {

  Metropolitan: Metro;

  Pics: string[];

  Cities: City[];

  Neighborhoods: Neighborhood[];

  Friends: Friend[];
}
