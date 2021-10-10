import { Component, Input } from '@angular/core';
import { HistoryItem } from 'src/app/models/history-item';
import { SearchItem } from 'src/app/models/search-item';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-item-description',
  templateUrl: './item-description.component.html',
  styleUrls: ['./item-description.component.scss']
})
export class ItemDescriptionComponent{

  @Input() itemSelected: SearchItem

  constructor(private historyService: HistoryService) { }

  closeDescription() {
    this.addItemToHistory(this.itemSelected)
    this.itemSelected = null
  }

  private addItemToHistory(item: SearchItem) {
    // Possible to use DatePipe but format from Figma is not there so this is faster solution
    let currentDate = new Date().toISOString().substring(0, 16).replace('T', ' ')
    let historyItem = new HistoryItem(item.name, currentDate)
    this.historyService.addItemToHistory(historyItem)
  }
}
