import ky, { KyResponse } from 'ky';

import { Neighborhood } from '../interfaces/Neighborhood';

export class API {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async about(): Promise<KyResponse> {
    return ky.get(this.baseURL + '/about');
  }

  async uploadPic(id: string, picture: File): Promise<string> {
    const formData = new FormData();
    formData.set('attribute', id);
    formData.set('picture', picture);
    return ky.post(this.baseURL + '/upload-pics', { body: formData }).text();
  }

}

