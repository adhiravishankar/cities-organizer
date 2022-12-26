export interface Neighborhood {
  ID: number;

  CityID: number;

  MetroID: number;

  FeaturedImage: string;

  Link: string;

  Name: string;

  HighSchoolScore: number;

  MiddleSchoolScore: number;

  ElementarySchoolScore: number;

  Address: string;

  MinimumValue: number;

  MaximumValue: number;

  MinSqft: number;

  MaxSqft: number;

  Notes: string;
}

export interface DetailedNeighborhood extends Neighborhood {
  Pics: string[];
}
