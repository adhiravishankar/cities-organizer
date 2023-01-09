import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './home/home.component';
import { MetroDetailsComponent } from './metro-details/metro-details.component';
import { CityDetailsComponent } from './city-details/city-details.component';
import { NeighborhoodDetailsComponent } from './neighborhood-details/neighborhood-details.component';
import { CreateMetroComponent } from './create-metro/create-metro.component';
import { CreateCityComponent } from './create-city/create-city.component';
import { CreateNeighborhoodComponent } from './create-neighborhood/create-neighborhood.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MetroDetailsComponent,
    CityDetailsComponent,
    NeighborhoodDetailsComponent,
    CreateMetroComponent,
    CreateCityComponent,
    CreateNeighborhoodComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
