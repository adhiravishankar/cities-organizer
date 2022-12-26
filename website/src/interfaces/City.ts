import { Neighborhood } from './Neighborhood';

export interface City {
  ID: number;

  Name: string

  Population: number;

  FeaturedImage: string;

  MetroID: number;

  Notes: string;
}

export interface DetailedCity extends City {
  Pics: string[]

  Neighborhoods: Neighborhood[]
}
