import {
  type Neighborhood,
} from './Neighborhood';

export type City = {
  FeaturedImage: string,

  ID: number,

  MetroID: number,

  Name: string,

  Population: number,
};

export type DetailedCity = City & {
  Neighborhoods: Neighborhood[],

  Pics: string[],
};
