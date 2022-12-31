import ky, { KyResponse } from 'ky';

export class CitiesAPI {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async cities(): Promise<KyResponse> {
    return ky.get(this.baseURL + '/cities').json();
  }

  async getCity(id: number): Promise<KyResponse> {
    return ky.get(this.baseURL + '/cities/' + id).json();
  }

  async insertCity(name: string, metroID: string, population: number, featuredImage: string, notes: string): Promise<KyResponse> {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('metro_id', metroID.toString());
    formData.set('featured_image', featuredImage);
    formData.set('notes', notes);
    formData.set('population', population.toString());
    return ky.post(this.baseURL + '/metros/', { body: formData });
  }

  async updateCity(id: string, name: string, population: number, featuredImage: string, notes: string): Promise<KyResponse> {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('featured_image', featuredImage);
    formData.set('notes', notes);
    formData.set('population', population.toString());
    return ky.put(this.baseURL + '/metros/' + id, { body: formData });
  }

}

