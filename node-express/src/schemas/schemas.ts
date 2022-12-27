import mongoose, {
  Schema,
} from 'mongoose';

import {
  type DetailedCity,
} from '../models/City';
import {
  type DetailedMetro,
} from '../models/Metro';
import {
  type DetailedNeighborhood,
} from '../models/Neighborhood';

export const MetroScheme = new Schema<DetailedMetro>({
  ExtendedName: String,
  FeaturedImage: String,
  Name: String,
  Notes: String,
  Pics: [String],
  Population: Number,
});

export const MetroModel = mongoose.model<DetailedMetro>('Metro', MetroScheme);

export const CityScheme = new Schema<DetailedCity>({
  FeaturedImage: String,
  MetroID: mongoose.Types.ObjectId,
  Name: String,
  Pics: [String],
  Population: Number,
});

export const CityModel = mongoose.model<DetailedCity>('City', CityScheme);

export const NeighborhoodSchema = new Schema<DetailedNeighborhood>({
  Address: String,
  CityID: mongoose.Types.ObjectId,
  ElementarySchoolScore: Number,
  FeaturedImage: String,
  HighSchoolScore: Number,
  Link: String,
  MaximumValue: Number,
  MaxSqft: Number,
  MetroID: mongoose.Types.ObjectId,
  MiddleSchoolScore: Number,
  MinimumValue: Number,
  MinSqft: Number,
  Name: String,
  Pics: [String],
});

export const NeighborhoodModel = mongoose.model<DetailedNeighborhood>('Neighborhood', NeighborhoodSchema);
