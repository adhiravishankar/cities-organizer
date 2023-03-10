import ky, { KyResponse } from 'ky';

import { Neighborhood } from '../interfaces/Neighborhood';
import { fetcher } from './API';


export class NeighborhoodAPI {
  baseURL: string;

  constructor() {
    this.baseURL = process.env.BASE_URL;
  }

  async neighborhoods(): Promise<SWRResponse> {
    return useSWR(this.baseURL + '/neighborhoods', fetcher);
  }

  async getNeighborhood(id: string): Promise<SWRResponse> {
    return useSWR(this.baseURL + '/neighborhoods/' + id, fetcher);
  }

  async insertNeighborhood(neighborhood: Neighborhood): Promise<KyResponse> {
    const formData = new FormData();
    formData.set('city_id', neighborhood.CityID);
    formData.set('metro_id', neighborhood.MetroID);
    formData.set('featured_image', neighborhood.FeaturedImage);
    formData.set('link', neighborhood.Link);
    formData.set('name', neighborhood.Name);
    formData.set('high_school_score', neighborhood.HighSchoolScore.toString());
    formData.set('middle_school_score', neighborhood.MiddleSchoolScore.toString());
    formData.set('elementary_school_score', neighborhood.ElementarySchoolScore.toString());
    formData.set('address', neighborhood.Address);
    formData.set('minimum_value', neighborhood.MinimumValue.toString());
    formData.set('maximum_value', neighborhood.MaximumValue.toString());
    formData.set('min_sqft', neighborhood.MinSqft.toString());
    formData.set('max_sqft', neighborhood.MaxSqft.toString());
    formData.set('notes', neighborhood.Notes);
    return ky.post(this.baseURL + '/neighborhoods', { body: formData });
  }

  async updateNeighborhood(neighborhood: Neighborhood): Promise<KyResponse> {
    const formData = new FormData();
    formData.set('city_id', neighborhood.CityID);
    formData.set('metro_id', neighborhood.MetroID);
    formData.set('featured_image', neighborhood.FeaturedImage);
    formData.set('link', neighborhood.Link);
    formData.set('name', neighborhood.Name);
    formData.set('high_school_score', neighborhood.HighSchoolScore.toString());
    formData.set('middle_school_score', neighborhood.MiddleSchoolScore.toString());
    formData.set('elementary_school_score', neighborhood.ElementarySchoolScore.toString());
    formData.set('address', neighborhood.Address);
    formData.set('minimum_value', neighborhood.MinimumValue.toString());
    formData.set('maximum_value', neighborhood.MaximumValue.toString());
    formData.set('min_sqft', neighborhood.MinSqft.toString());
    formData.set('max_sqft', neighborhood.MaxSqft.toString());
    formData.set('notes', neighborhood.Notes);
    return ky.post(this.baseURL + '/neighborhoods/' + neighborhood.ID, { body: formData });
  }

}
