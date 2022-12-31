import ky, { KyResponse } from 'ky';

export class API {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async login(username: string, password: string): Promise<KyResponse> {
    const formData = new FormData();
    formData.set('username', username);
    formData.set('password', password);
    return ky.post(this.baseURL + '/login', { body: formData });
  }

  async signup(username: string, password: string, name: string): Promise<KyResponse> {
    const formData = new FormData();
    formData.set('username', username);
    formData.set('password', password);
    formData.set('name', name);
    return ky.post(this.baseURL + '/signup', { body: formData });
  }

  async uploadPic(id: string, picture: File): Promise<string> {
    const formData = new FormData();
    formData.set('attribute', id);
    formData.set('picture', picture);
    return ky.post(this.baseURL + '/cities/' + id + '/upload', { body: formData }).text();
  }

  async neighborhoods(): Promise<KyResponse> {
    return ky.get(this.baseURL + '/neighborhoods');
  }

  async getNeighborhood(id: number): Promise<unknown> {
    return ky.get(this.baseURL + '/neighborhoods/' + id);
  }

}

