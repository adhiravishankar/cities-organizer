import { Injectable } from '@angular/core';
import {City} from "../interfaces/City";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DetailedCity} from "../interfaces/DetailedCity";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CityService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = environment.BASE_URL;
  }

  cities(): Observable<City[]> {
    return this.http.get<City[]>(this.baseURL + '/cities');
  }

  readCity(id: string): Observable<DetailedCity> {
    return this.http.get<DetailedCity>(this.baseURL + '/cities/' + id);
  }

  insertCity(name: string, metroID: string, population: number, featuredImage: string, notes: string): Observable<unknown> {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('metro_id', metroID);
    formData.set('featured_image', featuredImage);
    formData.set('notes', notes);
    formData.set('population', population.toString());
    return this.http.post(this.baseURL + '/cities', { body: formData });
  }

  updateCity(id: string, name: string, population: number, featuredImage: string, notes: string): Observable<unknown> {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('featured_image', featuredImage);
    formData.set('notes', notes);
    formData.set('population', population.toString());
    return this.http.put(this.baseURL + '/cities/' + id, { body: formData });
  }

}
