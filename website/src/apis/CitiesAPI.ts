import { get, post, put } from '@tkrotoff/fetch';

export class CitiesAPI {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async cities(): Promise<unknown> {
    return get(this.baseURL + '/cities').json();
  }

  async uploadPicForCity(id: number, picture: File): Promise<string> {
    const formData = new FormData();
    formData.set('picture', picture);
    return post(this.baseURL + '/cities/' + id + '/upload', formData).text();
  }

  async getCity(id: number): Promise<unknown> {
    return get(this.baseURL + '/cities/' + id).json();
  }

  async insertCity(name: string, metroID: number, population: number, featuredImage: string, notes: string): Promise<Response> {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('metro_id', metroID.toString());
    formData.set('featured_image', featuredImage);
    formData.set('notes', notes);
    formData.set('population', population.toString());
    return post(this.baseURL + '/metros/', formData);
  }

  async editCity(id: number, name: string, population: number, featuredImage: string, notes: string): Promise<Response> {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('featured_image', featuredImage);
    formData.set('notes', notes);
    formData.set('population', population.toString());
    return put(this.baseURL + '/metros/' + id, formData);
  }

}

