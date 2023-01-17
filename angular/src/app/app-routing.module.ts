import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CityDetailsComponent } from "../components/city-details/city-details.component";
import { CreateCityComponent } from "../components/create-city/create-city.component";
import { CreateMetroComponent } from "../components/create-metro/create-metro.component";
import { CreateNeighborhoodComponent } from "../components/create-neighborhood/create-neighborhood.component";
import { HomeComponent } from "../components/home/home.component";
import { MetroDetailsComponent } from "../components/metro-details/metro-details.component";
import { NeighborhoodDetailsComponent } from "../components/neighborhood-details/neighborhood-details.component";

const routes: Routes = [
  {
    title: 'Create Metro',
    path: 'create-metro',
    component: CreateMetroComponent,
  },
  {
    title: 'Create City',
    path: 'create-city',
    component: CreateCityComponent,
  },
  {
    title: 'Create Neighborhood',
    path: 'create-neighborhood',
    component: CreateNeighborhoodComponent,
  },
  {
    title: 'Metro Details',
    path: 'metros/:metro',
    component: MetroDetailsComponent,
  },
  {
    title: 'City Details',
    path: 'cities/:city',
    component: CityDetailsComponent,
  },
  {
    title: 'Neighborhood Details',
    path: 'neighborhoods/:neighborhood',
    component: NeighborhoodDetailsComponent,
  },
  {
    title: 'Home',
    component: HomeComponent,
    path: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
