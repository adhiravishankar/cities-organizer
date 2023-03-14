import ky, { KyResponse } from 'ky';
import useSWR, { SWRResponse } from 'swr';

import { fetcher } from './API';

export class MetroAPI {
  baseURL: string;

  constructor() {
    this.baseURL = process.env.BASE_URL;
  }

  async metros(): Promise<SWRResponse> {
    return useSWR(this.baseURL + '/metros', fetcher);
  }

  async getMetro(id: string): Promise<SWRResponse> {
    return useSWR(this.baseURL + '/metros/' + id, fetcher);
  }

  async insertMetro(name: string, extendedName: string, shortName: string, metroSizeRank: number, population: number, featuredImage: string, notes: string): Promise<KyResponse> {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('extended_name', extendedName);
    formData.set('short_name', shortName);
    formData.set('metro_size_rank', metroSizeRank.toString());
    formData.set('featured_image', featuredImage);
    formData.set('population', population.toString());
    formData.set('notes', notes);
    return ky.post(this.baseURL + '/metros', { body: formData });
  }

  async editMetro(id: string, name: string, extendedName: string, shortName: string, metroSizeRank: number, population: number, featuredImage: string, notes: string): Promise<KyResponse> {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('extended_name', extendedName);
    formData.set('short_name', shortName);
    formData.set('notes', notes);
    formData.set('metro_size_rank', metroSizeRank.toString());
    formData.set('featured_image', featuredImage);
    formData.set('population', population.toString());
    return ky.put(this.baseURL + '/metros/' + id, { body: formData });
  }

  async deleteMetro(id: number): Promise<KyResponse> {
    return ky.delete(this.baseURL + '/metros/' + id);
  }

}

