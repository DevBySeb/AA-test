import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { HistoryItem } from 'src/app/models/history-item';

import { SearchItem } from 'src/app/models/search-item'

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnChanges {

  @Output() fetchAllItems = new EventEmitter<boolean>();
  @Output() itemSelectedEvent = new EventEmitter<SearchItem>();
  @Input() itemsFetched: SearchItem[]
  displayFullBkg = false

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes)
  }

  searchAllItems() {
    this.fetchAllItems.emit(true)
    this.displayFullBkg = true
  }

  selectItem(item: SearchItem) {
    this.itemsFetched = []
    this.itemSelectedEvent.emit(item)

  }
}
