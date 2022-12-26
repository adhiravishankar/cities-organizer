import { City } from './City';
import { Friend } from './Friend';
import { Neighborhood } from './Neighborhood';

export interface Metro {

  ID: number;

  Name: string;

  ExtendedName: string;

  Population: number;

  MetroSizeRank: number;

  FeaturedImage: string;

  Notes: string;
}

export interface DetailedMetro extends Metro {
  Pics: string[];

  Cities: City[];

  Neighborhoods: Neighborhood[];

  Friends: Friend[];
}
