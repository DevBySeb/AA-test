import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SavedSearchesProviderService } from 'src/app/modules/search/services/saved-searches-provider.service';
import { SearchData } from '../../models/search-data.model';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss']
})
export class SearchHistoryComponent implements OnInit {
  @Output() selectSearchHistoryItem = new EventEmitter<SearchData>()

  constructor(private localStorage: SavedSearchesProviderService) { }

  ngOnInit(): void {
  }

  get searchHistoryItems() {
    return this.localStorage.getItems();
  }

  onDeleteHistoryItem(index: number) {
    this.localStorage.removeItem(index);
  }

  selectHistoryItem(index: number) {
    this.selectSearchHistoryItem.emit(this.localStorage.getItem(index));
  }
}
