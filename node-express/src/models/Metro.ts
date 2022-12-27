import {
  type City,
} from './City';
import {
  type Friend,
} from './Friend';
import {
  type Neighborhood,
} from './Neighborhood';

export type Metro = {

  ExtendedName: string,

  FeaturedImage: string,

  ID: number,

  Name: string,

  Notes: string,

  Population: number,

};

export type DetailedMetro = Metro & {
  Cities: City[],

  Friends: Friend[],

  Neighborhoods: Neighborhood[],

  Pics: string[],
};
