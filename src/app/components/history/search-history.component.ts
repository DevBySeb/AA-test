import { Component } from '@angular/core';
import { HistoryItem } from 'src/app/models/history-item';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss']
})
export class SearchHistoryComponent{

  historyItems = new Array<HistoryItem>()

  constructor(private historyService: HistoryService) { 
    this.historyItems = this.historyService.historyItems
  }
}
