import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { environment } from "../environments/environment";
import { DetailedMetro } from "../interfaces/DetailedMetro";
import { Metro } from "../interfaces/Metro";

@Injectable({
  providedIn: 'root'
})
export class MetroService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = environment.BASE_URL;
  }


  metros(): Observable<Metro[]> {
    return this.http.get<Metro[]>(this.baseURL + '/metros');
  }

  getMetro(id: string): Observable<DetailedMetro> {
    return this.http.get<DetailedMetro>(this.baseURL + '/metros/' + id);
  }

  insertMetro(name: string, extendedName: string, metroSizeRank: number, population: number, featuredImage: string, notes: string): Observable<unknown> {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('extended_name', extendedName);
    formData.set('metro_size_rank', metroSizeRank.toString());
    formData.set('featured_image', featuredImage);
    formData.set('population', population.toString());
    formData.set('notes', notes);
    return this.http.post(this.baseURL + '/metros', { body: formData });
  }

  editMetro(id: string, name: string, extendedName: string, metroSizeRank: number, population: number, featuredImage: string, notes: string): Observable<unknown> {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('extended_name', extendedName);
    formData.set('notes', notes);
    formData.set('metro_size_rank', metroSizeRank.toString());
    formData.set('featured_image', featuredImage);
    formData.set('population', population.toString());
    return this.http.put(this.baseURL + '/metros/' + id, { body: formData });
  }

  deleteMetro(id: number): Observable<unknown> {
    return this.http.delete(this.baseURL + '/metros/' + id);
  }
}
