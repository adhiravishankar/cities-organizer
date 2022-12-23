import { Friend } from './Friend';

export interface Metro {

  ID: number;

  Name: string;

  ExtendedName: string;

  Population: number;

  Notes: string;

  FeaturedImage: string;

}

export interface DetailedMetro extends Metro {
  Pics: string[];

  Friends: Friend[];
}
