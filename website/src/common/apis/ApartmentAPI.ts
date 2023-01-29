import ky, { KyResponse } from 'ky';

import { Apartment } from '../interfaces/Apartment';


export class ApartmentAPI {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async apartments(): Promise<KyResponse> {
    return ky.get(this.baseURL + '/apartments');
  }

  async getApartment(id: string): Promise<KyResponse> {
    return ky.get(this.baseURL + '/apartments/' + id);
  }

  async insertApartment(apartment: Apartment): Promise<KyResponse> {
    const formData = new FormData();
    formData.set('city_id', apartment.CityID);
    formData.set('metro_id', apartment.MetroID);
    formData.set('featured_image', apartment.FeaturedImage);
    formData.set('link', apartment.Link);
    formData.set('name', apartment.Name);
    formData.set('address', apartment.Address);
    formData.set('rent', apartment.Rent.toString());
    formData.set('sqft', apartment.Sqft.toString());
    formData.set('notes', apartment.Notes);
    return ky.post(this.baseURL + '/apartments', { body: formData });
  }

  async updateApartment(apartment: Apartment): Promise<KyResponse> {
    const formData = new FormData();
    formData.set('city_id', apartment.CityID);
    formData.set('metro_id', apartment.MetroID);
    formData.set('featured_image', apartment.FeaturedImage);
    formData.set('link', apartment.Link);
    formData.set('name', apartment.Name);
    formData.set('address', apartment.Address);
    formData.set('rent', apartment.Rent.toString());
    formData.set('sqft', apartment.Sqft.toString());
    formData.set('notes', apartment.Notes);
    return ky.post(this.baseURL + '/apartments/' + apartment.ID, { body: formData });
  }

}
