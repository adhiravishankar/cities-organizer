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

import { titleReducer } from "../reducers/TitleReducer";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CitiesTableComponent } from './cities-table/cities-table.component';
import { CityDetailsComponent } from './city-details/city-details.component';
import { CreateCityComponent } from './create-city/create-city.component';
import { CreateMetroComponent } from './create-metro/create-metro.component';
import { CreateNeighborhoodComponent } from './create-neighborhood/create-neighborhood.component';
import { HomeComponent } from './home/home.component';
import { MetroDetailsComponent } from './metro-details/metro-details.component';
import { MetrosListComponent } from './metros-list/metros-list.component';
import { MetrosTableComponent } from './metros-table/metros-table.component';
import { NeighborhoodDetailsComponent } from './neighborhood-details/neighborhood-details.component';
import { NeighborhoodsTableComponent } from './neighborhoods-table/neighborhoods-table.component';

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
