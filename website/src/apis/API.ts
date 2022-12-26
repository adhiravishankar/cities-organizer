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

  async neighborhoods(): Promise<unknown> {
    return get(this.baseURL + '/neighborhoods').json();
  }

  async uploadPicForNeighborhood(id: number, picture: File): Promise<string> {
    const formData = new FormData();
    formData.set('picture', picture);
    return post(this.baseURL + '/neighborhoods/' + id + '/upload', formData).text();
  }

  async getNeighborhood(id: number): Promise<unknown> {
    return get(this.baseURL + '/neighborhoods/' + id).json();
  }

}

