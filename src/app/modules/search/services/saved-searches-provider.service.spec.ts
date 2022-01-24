import { TestBed } from '@angular/core/testing';

import { SavedSearchesProviderService } from './saved-searches-provider.service';

describe('SavedSearchesProviderService', () => {
  let service: SavedSearchesProviderService;
  let storedItems: any[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedSearchesProviderService);
    storedItems = ['A', 'B', 'C'];
  });

  it('should get all items from storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storedItems));

    const results = service.getItems();
    expect(results).toEqual(storedItems);
  });

  it('should get all items from storage and return empty array if nothing stored', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const results = service.getItems();
    expect(results).toEqual([]);
  });

  it('should add item to storage', () => {
    const newItem = 'D';
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storedItems));
    const setItemSpy = spyOn(localStorage, 'setItem').and.callFake(() => { });
    service.addItem(newItem);

    expect(setItemSpy).toHaveBeenCalledWith(jasmine.anything(), JSON.stringify([...storedItems, newItem]));
  });

  it('should get single item from storage', () => {
    const index = 1;
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storedItems));

    const result = service.getItem(index);
    expect(result).toEqual(storedItems[index]);
  });

  it('should remove item from storage', () => {
    const index = 1;
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storedItems));
    const setItemSpy = spyOn(localStorage, 'setItem').and.callFake(() => { });

    service.removeItem(index);

    const storedItemsAfterRemoval = [...storedItems];
    storedItemsAfterRemoval.splice(index, 1);
    expect(setItemSpy).toHaveBeenCalledWith(jasmine.anything(), JSON.stringify(storedItemsAfterRemoval));
  });
});
