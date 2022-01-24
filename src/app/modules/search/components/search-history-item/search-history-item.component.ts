import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchHistory } from '../../models/search-data-history.model';

@Component({
  selector: 'app-search-history-item',
  templateUrl: './search-history-item.component.html',
  styleUrls: ['./search-history-item.component.scss']
})
export class SearchHistoryItemComponent implements OnInit {
  @Input('searchHistoryItem') item?: SearchHistory;
  @Output() selectedHistoryItem = new EventEmitter<void>();
  @Output() deleteHistoryItem = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  selectHistoryItem() {
    this.selectedHistoryItem.emit();
  }

  deleteItem() {
    this.deleteHistoryItem.emit();
  }
}
