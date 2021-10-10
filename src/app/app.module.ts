// Angular modules
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'

// Material Modules
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {MatDividerModule} from '@angular/material/divider'
import {MatCardModule} from '@angular/material/card'

// App components
import { AppComponent } from './app.component';
import { HomeContainerComponent } from './components/home-container/home-container.component';
import { SearchListComponent } from './components/search/search-list/search-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SearchService } from './services/search.service';
import { HttpClientModule } from '@angular/common/http'
import { ENVIRONMENT } from 'src/environments/common';
import { environment } from 'src/environments/environment';
import { ItemDescriptionComponent } from './components/search/item-description/item-description.component';
import { HistoryItemComponent } from './components/history/history-item/history-item.component'
import { SearchHistoryComponent } from './components/history/search-history.component'
import { HistoryService } from './services/history.service'

const appComponents = [HomeContainerComponent, SearchListComponent, ItemDescriptionComponent, HistoryItemComponent, SearchHistoryComponent]

const materialModules = [MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule,
                         MatDividerModule, FormsModule, ReactiveFormsModule, MatCardModule]

const services = [SearchService, HistoryService]

@NgModule({
  declarations: [
    AppComponent,
    appComponents
  ],
  imports: [
    materialModules,
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [services,
    {
      provide: ENVIRONMENT,
      useValue: environment
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
