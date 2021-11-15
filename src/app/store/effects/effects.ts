import {Injectable} from "@angular/core";
import {
  brewerySelected,
  loadSearchHistory,
  searchBrewery,
  searchFail,
  searchSuccess,
  setSearchHistory,
  setSelectedBrewery,
  setView
} from "../actions/actions";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from "rxjs/operators";
import {Brewery, SearchBreweryRequest, SearchHistory} from "../models/model";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {CARD_STATE} from "../../components/search-components/brewery-list/brewery-list.constants";
import {LOCAL_STORAGE_SEARCH_HISTORY} from "../../app.component.constants";

@Injectable()
export class ApplicationEffects {


  searchBrewery$ = createEffect(() =>
    this.actions.pipe(
      ofType(searchBrewery),
      mergeMap((searchBreweryRequest: SearchBreweryRequest) => {
        return this.sendSearchRequest(searchBreweryRequest)
          .pipe(
            map((searchBreweryResponse: Brewery[]) =>
              searchSuccess({searchBreweryResponse})
            ),
            catchError((error) =>
              of(searchFail({error: error}))
            )
          );
      })
    )
  );


  updateSearchHistory$ = createEffect(() =>
    this.actions.pipe(
      ofType(brewerySelected),
      switchMap(({selectedBrewery}) => {
        const currentSearch: SearchHistory = {query: selectedBrewery.name, dateTime: Date.now()};
        let updatedSearchHistoryArray = [currentSearch];
        const localStorageValue = localStorage.getItem(LOCAL_STORAGE_SEARCH_HISTORY);
        if (localStorageValue) {
          try {
            const existingHistory = JSON.parse(localStorageValue);
            updatedSearchHistoryArray.push(...existingHistory);
          } catch {
            localStorage.removeItem(LOCAL_STORAGE_SEARCH_HISTORY);
          }
        }
        return [setSelectedBrewery({selectedBrewery}),
          setSearchHistory({searchHistory: updatedSearchHistoryArray})];
      })
    )
  );

  saveSearchHistory$ = createEffect(() =>
    this.actions.pipe(
      ofType(setSearchHistory),
      map(({searchHistory}) => {
        const localStorageValue = localStorage.getItem(LOCAL_STORAGE_SEARCH_HISTORY);
        if (localStorageValue) {
          localStorage.removeItem(LOCAL_STORAGE_SEARCH_HISTORY);
        }
        localStorage.setItem(LOCAL_STORAGE_SEARCH_HISTORY, JSON.stringify(searchHistory));
      })
    ), {dispatch: false}
  );

  loadSearchHistory$ = createEffect(() =>
    this.actions.pipe(
      ofType(loadSearchHistory),
      switchMap(() => {
        const localStorageValue = localStorage.getItem(LOCAL_STORAGE_SEARCH_HISTORY);
        if (localStorageValue) {
          try {
            const existingHistory = JSON.parse(localStorageValue);
            if (existingHistory?.length > 0) {
              return [
                setSearchHistory({searchHistory: existingHistory}),
                setView({view: CARD_STATE.SEARCH_HISTORY})];
            }
          } catch {
            localStorage.removeItem(LOCAL_STORAGE_SEARCH_HISTORY);
          }
        }
        return [setSearchHistory({searchHistory: []})];
      })
    )
  );


  constructor(
    private actions: Actions,
    private http: HttpClient,
  ) {
  }

  getSearchBreweryURL({query, limit}: SearchBreweryRequest): string {
    return `https://api.openbrewerydb.org/breweries/search?page=1&per_page=${limit}&query=${query}`;
  }

  sendSearchRequest(searchBreweryRequest: SearchBreweryRequest) {
    const searchBreweryURL = this.getSearchBreweryURL(searchBreweryRequest);
    return this.http.get<Brewery[]>(searchBreweryURL);
  }

}



