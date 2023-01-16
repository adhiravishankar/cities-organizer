import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = environment.BASE_URL;
  }

  about(): Observable<unknown> {
    return this.http.get('/about');
  }

  uploadPic(id: string, picture: File): Observable<unknown> {
    const formData = new FormData();
    formData.set('attribute', id);
    formData.set('picture', picture);
    return this.http.post( this.baseURL + '/upload-pics', { body: formData });
  }
}
