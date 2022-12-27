export type Neighborhood = {
  Address: string,

  CityID: number,

  ElementarySchoolScore: number,

  FeaturedImage: string,

  HighSchoolScore: number,

  ID: number,

  Link: string,

  MaxSqft: number,

  MaximumValue: number,

  MetroID: number,

  MiddleSchoolScore: number,

  MinSqft: number,

  MinimumValue: number,

  Name: string,
};

export type DetailedNeighborhood = Neighborhood & {
  Pics: string[],
};
