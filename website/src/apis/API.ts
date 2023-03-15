import axios, { AxiosInstance } from 'axios';

export const fetcher = url => fetch(url).then(r => r.json());

export class API {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({ baseURL: process.env.BASE_URL });
  }

  async about() {
    return this.instance.get('/about');
  }

  async uploadPic(id: string, picture: File): Promise<string> {
    const formData = new FormData();
    formData.set('attribute', id);
    formData.set('picture', picture);
    return ky.post(this.baseURL + '/upload-pics', { body: formData }).text();
  }

}

