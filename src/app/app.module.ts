import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BreweryListComponent} from './components/search-components/brewery-list/brewery-list.component';
import {NavbarComponent} from './components/shared-components/navbar/navbar.component';
import {FooterComponent} from './components/shared-components/footer/footer.component';
import {StoreModule} from "@ngrx/store";
import {metaReducers, reducers} from "./store";
import {ReactiveFormsModule} from "@angular/forms";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from "@ngrx/effects";
import {ApplicationEffects} from "./store/effects/effects";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {BreweryDetailComponent} from './components/search-components/brewery-detail/brewery-detail.component';
import {DatePipe} from "./pipes/date-pipe";
import {SearchBarComponent} from "./components/search-components/search-bar/search-bar.component";
import {SearchHistoryComponent} from './components/search-components/search-history/search-history.component';
import {MatListModule} from "@angular/material/list";
import {CommonModule} from "@angular/common";
import {SearchContainerComponent} from './components/search-components/search-container/search-container.component';
import {LoaderComponent} from './components/shared-components/loader/loader.component';
import {InfoBoxComponent} from './components/shared-components/info-box/info-box.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    BreweryListComponent,
    NavbarComponent,
    FooterComponent,
    BreweryDetailComponent,
    DatePipe,
    SearchHistoryComponent,
    SearchContainerComponent,
    LoaderComponent,
    InfoBoxComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forRoot([ApplicationEffects]),
    StoreModule.forRoot(reducers, {metaReducers}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
