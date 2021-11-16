import {bufferTime, Observable, of} from "rxjs";
import {Action} from "@ngrx/store";
import {ApplicationEffects} from "./effects";
import {async, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {provideMockStore} from "@ngrx/store/testing";
import {provideMockActions} from "@ngrx/effects/testing";
import * as fromActions from '../actions/actions'
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Brewery, SearchHistory} from "../models/model";
import {LOCAL_STORAGE_SEARCH_HISTORY} from "../../app.component.constants";

describe('Test Effects', () => {
  let actions$: Observable<Action>;
  let effects: ApplicationEffects;
  const brewery: Brewery = {
    id: "g-man-brewery-g-man-sports-bar-tualatin",
    name: "Sports Bar",
    brewery_type: "micro",
    street: "18791 SW Martinazzi Ave",
    address_2: 'null',
    address_3: 'null',
    city: "Tualatin",
    state: "Oregon",
    county_province: 'null',
    postal_code: "97062-6808",
    country: "United States",
    longitude: "-122.7598045",
    latitude: "45.3841006",
    phone: "5033105159",
    website_url: "http://www.hotseatsportsbar.com",
    updated_at: "2021-10-23T02:24:55.243Z",
    created_at: "2021-10-23T02:24:55.243Z"
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApplicationEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.get<ApplicationEffects>(ApplicationEffects);
  }));

  it('SHOULD dispatch setSearchHistory action WHEN loadSearchHistory action is dispatched', fakeAsync(() => {
    const searchHistory: SearchHistory[] = [{query: '2 Dogz and A Guy Brewing', dateTime: 1637023690837}];
    actions$ = of({type: fromActions.SearchAction.LOAD_SEARCH_HISTORY});
    spyOn(window.localStorage, 'getItem').and.callFake(function () {
      return JSON.stringify(searchHistory);
    });
    effects.loadSearchHistory$.pipe(bufferTime(500)).subscribe(action => {
      expect(action[0].type).toBe(fromActions.SearchAction.SET_SEARCH_HISTORY);
      expect(action[1].type).toBe(fromActions.SearchAction.SET_VIEW);
    });
  }));


  it('SHOULD save in localStorage when setSearchHistory action is dispatched', fakeAsync(() => {
    const oldSearchHistory: SearchHistory[] = [{query: '2 Dogz and A Guy Brewing', dateTime: 1637023690837}];
    const newSearchHistory: SearchHistory[] = [{query: 'This is new', dateTime: 1444443690837}];
    actions$ = of({type: fromActions.SearchAction.SET_SEARCH_HISTORY, searchHistory: newSearchHistory});
    spyOn(window.localStorage, 'getItem').and.callFake(function () {
      return JSON.stringify(oldSearchHistory);
    });
    const setItemSpy = spyOn(window.localStorage, 'setItem');
    effects.saveSearchHistory$.subscribe(action => {
    });
    tick(1000);
    expect(setItemSpy).toHaveBeenCalledWith(LOCAL_STORAGE_SEARCH_HISTORY, JSON.stringify(newSearchHistory));
  }));

  it('SHOULD update search history when brewerySelected action is dispatched', fakeAsync(() => {
    const selectedBrewery = brewery;
    const oldSearchHistory: SearchHistory[] = [{query: '2 Dogz and A Guy Brewing', dateTime: 1637023690837}];
    actions$ = of({type: fromActions.SearchAction.BREWERY_SELECTED, selectedBrewery});
    spyOn(window.localStorage, 'getItem').and.callFake(function () {
      return JSON.stringify(oldSearchHistory);
    });
    effects.updateSearchHistory$.pipe(bufferTime(500)).subscribe(action => {
      expect(action[0]).toEqual(fromActions.setSelectedBrewery({selectedBrewery}));
      expect(action[1]).toEqual(fromActions.setSearchHistory(
        {searchHistory: [{query: 'Sports Bar', dateTime: Date.now()}, ...oldSearchHistory]}));
    });
  }));
});
