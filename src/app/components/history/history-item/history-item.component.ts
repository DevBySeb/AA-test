import { Component, Input, OnInit } from '@angular/core';
import { HistoryItem } from 'src/app/models/history-item';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss']
})
export class HistoryItemComponent implements OnInit {

  @Input() historyItem: HistoryItem

  constructor(private historyService: HistoryService) { }

  ngOnInit() {
  }

  deleteHistoryItem() {
    this.historyService.deleteItem(this.historyItem)
  }
}
