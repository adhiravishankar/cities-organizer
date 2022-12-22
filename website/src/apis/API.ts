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

  async getMetro(): Promise<unknown> {
    return get(this.baseURL + '/metro/:metro').json();
  }

  async editMetro(id: number, name: string, extendedName: string, population: number): Promise<Response> {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('extended_name', extendedName);
    formData.set('population', population.toString());
    return put(this.baseURL + '/metros/' + id, formData);
  }
  
  async uploadPicForMetro(id: number, picture: File): Promise<string> {
    console.log('file upload 4');
    const formData = new FormData();
    formData.set('picture', picture);
    return post(this.baseURL + '/metros/' + id + '/upload', formData).text();
  }

}

