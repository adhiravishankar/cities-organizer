import ky, { KyResponse } from 'ky';

export class CitiesAPI {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async cities(): Promise<KyResponse> {
    return ky.get(this.baseURL + '/cities');
  }

  async readCity(id: string): Promise<KyResponse> {
    return ky.get(this.baseURL + '/cities/' + id);
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

