import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { BreadcrumbModule } from "xng-breadcrumb";

import { CitiesTableComponent } from '../components/cities-table/cities-table.component';
import { CityDetailsComponent } from '../components/city-details/city-details.component';
import { CreateCityComponent } from '../components/create-city/create-city.component';
import { CreateMetroComponent } from '../components/create-metro/create-metro.component';
import { CreateNeighborhoodComponent } from '../components/create-neighborhood/create-neighborhood.component';
import { HomeComponent } from '../components/home/home.component';
import { MetroDetailsComponent } from '../components/metro-details/metro-details.component';
import { MetrosListComponent } from '../components/metros-list/metros-list.component';
import { MetrosTableComponent } from '../components/metros-table/metros-table.component';
import { NeighborhoodDetailsComponent } from '../components/neighborhood-details/neighborhood-details.component';
import { NeighborhoodsTableComponent } from '../components/neighborhoods-table/neighborhoods-table.component';
import { titleReducer } from "../reducers/TitleReducer";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

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
    BreadcrumbModule,
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
