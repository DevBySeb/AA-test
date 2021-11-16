import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchHistoryComponent} from './search-history.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {selectSearchHistory} from "../../../store/selectors/selectors";
import {initialApplicationState, SearchHistory} from "../../../store/models/model";
import {By} from "@angular/platform-browser";
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from "@angular/core";
import {DatePipe} from "../../../shared/pipes/date-pipe";
import {setSearchHistory} from "../../../store/actions/actions";
import {MatIconModule} from "@angular/material/icon";

describe('SearchHistoryComponent', () => {
  let component: SearchHistoryComponent;
  let fixture: ComponentFixture<SearchHistoryComponent>;
  let store: MockStore;
  const searchHistory: SearchHistory[] = [
    {query: 'Sports Bar', dateTime: 1637023690837},
    {query: '2 Dogz and A Guy Brewing', dateTime: 1637023690837}
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [SearchHistoryComponent, DatePipe],
      providers: [provideMockStore({initialState: initialApplicationState})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and show search History', () => {
    expect(component).toBeTruthy();
    expect(component.searchHistory).toEqual([]);
    let listElements = fixture.debugElement.queryAll(By.css('.query'));
    let innerTexts = listElements.map((element: DebugElement) => element.nativeElement.innerText);
    expect(innerTexts).toEqual([]);
    store.overrideSelector(selectSearchHistory, searchHistory);
    store.refreshState();
    fixture.detectChanges();
    listElements = fixture.debugElement.queryAll(By.css('.query'));
    innerTexts = listElements.map((element: DebugElement) => element.nativeElement.innerText);
    expect(component.searchHistory).toEqual(searchHistory);
    expect(innerTexts).toEqual(['Sports Bar', '2 Dogz and A Guy Brewing']);
  });

  it('should remove search history and dispatch setSearchHistory', () => {
    const indexToBeRemoved = 0;
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    store.overrideSelector(selectSearchHistory, searchHistory);
    store.refreshState();
    fixture.detectChanges();
    component.removeHistoryElement(indexToBeRemoved);
    expect(dispatchSpy).toHaveBeenCalledWith(setSearchHistory({searchHistory: searchHistory.slice(1)}));
  });
});
