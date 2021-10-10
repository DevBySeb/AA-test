import { Injectable } from '@angular/core';
import { HistoryItem } from '../models/history-item';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private historyItemsArray = new Array<HistoryItem>()

  constructor() { }

  get historyItems() {
    return this.historyItemsArray
  }

  public addItemToHistory(newItem: HistoryItem) {
    this.historyItemsArray.push(newItem)
  }

  public deleteItem(item: HistoryItem) {
    let itemIndex = this.historyItemsArray.indexOf(item)
    this.historyItemsArray.splice(itemIndex, 1)
  }
}
