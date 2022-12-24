import { get, post, put } from '@tkrotoff/fetch';

export class API {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async login(username: string, password: string): Promise<string> {
    const formData = new FormData();
    formData.set('username', username);
    formData.set('password', password);
    return post(this.baseURL + '/login', formData).text();
  }

  async signup(username: string, password: string, name: string): Promise<string> {
    const formData = new FormData();
    formData.set('username', username);
    formData.set('password', password);
    formData.set('name', name);
    return post(this.baseURL + '/signup', formData).text();
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

  async editMetro(id: number, name: string, extendedName: string, population: number, featuredImage: string): Promise<Response> {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('extended_name', extendedName);
    formData.set('featured_image', featuredImage);
    formData.set('population', population.toString());
    return put(this.baseURL + '/metros/' + id, formData);
  }
  
  async uploadPicForMetro(id: number, picture: File): Promise<string> {
    const formData = new FormData();
    formData.set('picture', picture);
    return post(this.baseURL + '/metros/' + id + '/upload', formData).text();
  }
  async getCity(id: number): Promise<unknown> {
    return get(this.baseURL + '/cities/' + id).json();
  }

  async getNeighborhood(id: number): Promise<unknown> {
    return get(this.baseURL + '/neighborhoods/' + id).json();
  }

}

