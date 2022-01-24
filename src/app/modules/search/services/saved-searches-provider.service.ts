import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SavedSearchesProviderService {
  private SAVEDSEARCHKEY = 'search-app-saved-results';

  constructor() { }

  addItem(value: any) {
    const savedResults = this.getItems();
    localStorage.setItem(this.SAVEDSEARCHKEY, JSON.stringify([...savedResults, value]));
  }

  getItem(index: number) {
    const items = this.getItems();
    return items[index];
  }

  getItems(): any[] {
    const items = localStorage.getItem(this.SAVEDSEARCHKEY);

    if (!items) {
      return [];
    }

    return JSON.parse(items);
  }

  removeItem(index: number) {
    const items = this.getItems();
    items.splice(index, 1);
    localStorage.setItem(this.SAVEDSEARCHKEY, JSON.stringify(items));
  }
}
