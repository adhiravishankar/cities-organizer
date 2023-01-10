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
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {MatMenuModule} from "@angular/material/menu";
import {titleReducer} from "../reducers/TitleReducer";

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
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ router: routerReducer, title: titleReducer }, {}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    ReactiveFormsModule,
    NgxDatatableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
