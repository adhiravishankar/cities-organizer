import { DetailedMetro } from "./DetailedMetro";
import { Metro } from "./Metro";

export interface MetroState {
  metros?: Metro[];

  selectedMetro?: DetailedMetro;
}
