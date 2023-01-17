import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { environment } from "../environments/environment";
import { DetailedNeighborhood } from "../interfaces/DetailedNeighborhood";
import { Neighborhood } from "../interfaces/Neighborhood";

@Injectable({
  providedIn: 'root'
})
export class NeighborhoodService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = environment.BASE_URL;
  }

  neighborhoods(): Observable<Neighborhood[]> {
    return this.http.get<Neighborhood[]>(this.baseURL + '/neighborhoods');
  }

  getNeighborhood(id: string): Observable<DetailedNeighborhood> {
    return this.http.get<DetailedNeighborhood>(this.baseURL + '/neighborhoods/' + id);
  }

  insertNeighborhood(neighborhood: Neighborhood): Observable<unknown> {
    const formData = new FormData();
    formData.set('city_id', neighborhood.CityID);
    formData.set('metro_id', neighborhood.MetroID);
    formData.set('featured_image', neighborhood.FeaturedImage);
    formData.set('link', neighborhood.Link);
    formData.set('name', neighborhood.Name);
    formData.set('high_school_score', neighborhood.HighSchoolScore.toString());
    formData.set('middle_school_score', neighborhood.MiddleSchoolScore.toString());
    formData.set('elementary_school_score', neighborhood.ElementarySchoolScore.toString());
    formData.set('address', neighborhood.Address);
    formData.set('minimum_value', neighborhood.MinimumValue.toString());
    formData.set('maximum_value', neighborhood.MaximumValue.toString());
    formData.set('min_sqft', neighborhood.MinSqft.toString());
    formData.set('max_sqft', neighborhood.MaxSqft.toString());
    formData.set('notes', neighborhood.Notes);
    return this.http.post(this.baseURL + '/neighborhoods', { body: formData });
  }

  updateNeighborhood(neighborhood: Neighborhood): Observable<unknown> {
    const formData = new FormData();
    formData.set('city_id', neighborhood.CityID);
    formData.set('metro_id', neighborhood.MetroID);
    formData.set('featured_image', neighborhood.FeaturedImage);
    formData.set('link', neighborhood.Link);
    formData.set('name', neighborhood.Name);
    formData.set('high_school_score', neighborhood.HighSchoolScore.toString());
    formData.set('middle_school_score', neighborhood.MiddleSchoolScore.toString());
    formData.set('elementary_school_score', neighborhood.ElementarySchoolScore.toString());
    formData.set('address', neighborhood.Address);
    formData.set('minimum_value', neighborhood.MinimumValue.toString());
    formData.set('maximum_value', neighborhood.MaximumValue.toString());
    formData.set('min_sqft', neighborhood.MinSqft.toString());
    formData.set('max_sqft', neighborhood.MaxSqft.toString());
    formData.set('notes', neighborhood.Notes);
    return this.http.post(this.baseURL + '/neighborhoods/' + neighborhood.ID, { body: formData });
  }
}
