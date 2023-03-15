import ky, { KyResponse } from 'ky';

import { fetcher } from './API';

export class CitiesAPI {
  baseURL: string;

  constructor() {
    this.baseURL = process.env.BASE_URL;
  }

  async cities(): Promise<SWRResponse> {
    return useSWR(this.baseURL + '/cities', fetcher);
  }

  async readCity(id: string): Promise<SWRResponse> {
    return useSWR(this.baseURL + '/cities/' + id);
  }

  async insertCity(name: string, metroID: string, population: number, featuredImage: string, notes: string): Promise<KyResponse> {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('metro_id', metroID);
    formData.set('featured_image', featuredImage);
    formData.set('notes', notes);
    formData.set('population', population.toString());
    return ky.post(this.baseURL + '/cities', { body: formData });
  }

  async updateCity(id: string, name: string, population: number, featuredImage: string, notes: string): Promise<KyResponse> {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('featured_image', featuredImage);
    formData.set('notes', notes);
    formData.set('population', population.toString());
    return ky.put(this.baseURL + '/cities/' + id, { body: formData });
  }

}

