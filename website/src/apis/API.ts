import ky from 'ky';
import useSWR, { SWRResponse } from 'swr';

export const fetcher = url => fetch(url).then(r => r.json());

export class API {
  baseURL: string;

  constructor() {
    this.baseURL = process.env.BASE_URL;
  }

  async about(): Promise<SWRResponse> {
    return useSWR(this.baseURL + '/about', fetcher);
  }

  async uploadPic(id: string, picture: File): Promise<string> {
    const formData = new FormData();
    formData.set('attribute', id);
    formData.set('picture', picture);
    return ky.post(this.baseURL + '/upload-pics', { body: formData }).text();
  }

}

