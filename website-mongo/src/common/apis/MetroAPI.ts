import ky, { KyResponse } from 'ky';

export class MetroAPI {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async metros(): Promise<KyResponse> {
    return ky.get(this.baseURL + '/metros');
  }

  async getMetro(id: number): Promise<KyResponse> {
    return ky.get(this.baseURL + '/metros/' + id);
  }

  async insertMetro(name: string, extendedName: string, metroSizeRank: number, population: number, featuredImage: string, notes: string): Promise<KyResponse> {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('extended_name', extendedName);
    formData.set('metro_size_rank', metroSizeRank.toString());
    formData.set('featured_image', featuredImage);
    formData.set('population', population.toString());
    formData.set('notes', notes);
    return ky.post(this.baseURL + '/metros', { body: formData });
  }

  async editMetro(id: string, name: string, extendedName: string, metroSizeRank: number, population: number, featuredImage: string, notes: string): Promise<KyResponse> {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('extended_name', extendedName);
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

