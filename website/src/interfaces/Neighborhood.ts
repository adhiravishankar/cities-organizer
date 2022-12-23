export interface Neighborhood {
  ID: number;

  CityID: number;

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
}

export interface DetailedNeighborhood {
  Pics: string[];
}