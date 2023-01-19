import { City } from "./City";
import { Neighborhood } from "./Neighborhood";

export interface DetailedCity {
  City: City;

  Pics: string[];

  Neighborhoods: Neighborhood[];
}
