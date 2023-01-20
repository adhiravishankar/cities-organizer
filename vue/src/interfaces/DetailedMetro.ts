import type { City } from "./City";
import type { Friend } from "./Friend";
import type { Metro } from "./Metro";
import type { Neighborhood } from "./Neighborhood";

export interface DetailedMetro {
  Metropolitan: Metro;

  Pics: string[];

  Cities: City[];

  Neighborhoods: Neighborhood[];

  Friends: Friend[];
}
