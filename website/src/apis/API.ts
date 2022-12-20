import { get, post } from '@tkrotoff/fetch';

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

}

