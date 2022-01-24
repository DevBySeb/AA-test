import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchResultDetailsComponent } from './components/search-result-details/search-result-details.component';
import { SearchHistoryComponent } from './components/search-history/search-history.component';
import { SearchHistoryItemComponent } from './components/search-history-item/search-history-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    SearchComponent,
    SearchInputComponent,
    SearchResultsComponent,
    SearchResultComponent,
    SearchResultDetailsComponent,
    SearchHistoryComponent,
    SearchHistoryItemComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }
