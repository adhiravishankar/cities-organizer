import type { City } from "./City";
import type { Neighborhood } from "./Neighborhood";

export interface DetailedCity {
  City: City;

  Pics: string[];

  Neighborhoods: Neighborhood[];
}
