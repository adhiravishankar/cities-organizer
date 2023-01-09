import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateCityComponent} from "./create-city/create-city.component";
import {CreateMetroComponent} from "./create-metro/create-metro.component";
import {CreateNeighborhoodComponent} from "./create-neighborhood/create-neighborhood.component";
import {MetroDetailsComponent} from "./metro-details/metro-details.component";
import {CityDetailsComponent} from "./city-details/city-details.component";
import {NeighborhoodDetailsComponent} from "./neighborhood-details/neighborhood-details.component";
import {HomeComponent} from "./home/home.component";

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
