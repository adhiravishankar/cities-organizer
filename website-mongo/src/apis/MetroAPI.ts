import { del, get, post, put } from '@tkrotoff/fetch';

export class MetroAPI {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async metros(): Promise<unknown> {
    return get(this.baseURL + '/metros').json();
  }

  async getMetro(id: number): Promise<unknown> {
    return get(this.baseURL + '/metros/' + id).json();
  }

  async getMetroPics(id: number): Promise<unknown> {
    return get(this.baseURL + '/metros/' + id + '/pics').json();
  }

  async insertMetro(name: string, extendedName: string, metroSizeRank: number, population: number, featuredImage: string, notes: string): Promise<Response> {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('extended_name', extendedName);
    formData.set('metro_size_rank', metroSizeRank.toString());
    formData.set('featured_image', featuredImage);
    formData.set('population', population.toString());
    formData.set('notes', notes);
    return post(this.baseURL + '/metros', formData);
  }

  async editMetro(id: number, name: string, extendedName: string, metroSizeRank: number, population: number, featuredImage: string, notes: string): Promise<Response> {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('extended_name', extendedName);
    formData.set('notes', notes);
    formData.set('metro_size_rank', metroSizeRank.toString());
    formData.set('featured_image', featuredImage);
    formData.set('population', population.toString());
    return put(this.baseURL + '/metros/' + id, formData);
  }

  async uploadPicForMetro(id: number, picture: File): Promise<string> {
    const formData = new FormData();
    formData.set('picture', picture);
    return post(this.baseURL + '/metros/' + id + '/upload', formData).text();
  }

  async deleteMetro(id: number): Promise<unknown> {
    return del(this.baseURL + '/metros/' + id).json();
  }

}

