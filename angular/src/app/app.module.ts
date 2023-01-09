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
import { MetrosListComponent } from './metros-list/metros-list.component';
import { MetrosTableComponent } from './metros-table/metros-table.component';
import { CitiesTableComponent } from './cities-table/cities-table.component';
import { NeighborhoodsTableComponent } from './neighborhoods-table/neighborhoods-table.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MetroDetailsComponent,
    CityDetailsComponent,
    NeighborhoodDetailsComponent,
    CreateMetroComponent,
    CreateCityComponent,
    CreateNeighborhoodComponent,
    MetrosListComponent,
    MetrosTableComponent,
    CitiesTableComponent,
    NeighborhoodsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
