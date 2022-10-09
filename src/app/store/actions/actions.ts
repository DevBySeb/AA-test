import {createAction, props} from '@ngrx/store';
import {Brewery, SearchBreweryRequest, SearchHistory} from "../models/model";
import {HttpErrorResponse} from "@angular/common/http";
import {CARD_STATE} from "../../components/search-components/search-container/search-container.constants";

export const SearchAction = {
  SEARCH_BREWERY: '[ApplicationSearch] Search for a brewery',
  SAVE_SEARCH_REQUEST: '[ApplicationSearch] Save Search for a brewery',
  SEARCH_SUCCESSFUL: '[ApplicationSearch] Brewery search successful',
  SEARCH_FAIL: '[ApplicationSearch] Brewery Search failed',
  SET_VIEW: '[ApplicationSearch] Set brewery view',
  SET_SELECTED_BREWERY: '[ApplicationSearch] Set selected Brewery in store',
  BREWERY_SELECTED: '[ApplicationSearch] User selected a brewery',
  SET_SEARCH_HISTORY: '[ApplicationSearch] Set search history in store',
  LOAD_SEARCH_HISTORY: '[ApplicationSearch] Load search history from local storage',
};

export const loadSearchHistory = createAction(
  SearchAction.LOAD_SEARCH_HISTORY
);

export const searchBrewery = createAction(
  SearchAction.SEARCH_BREWERY,
  props<SearchBreweryRequest>()
);

export const setView = createAction(
  SearchAction.SET_VIEW,
  props<{ view: CARD_STATE }>()
);

export const setSelectedBrewery = createAction(
  SearchAction.SET_SELECTED_BREWERY,
  props<{ selectedBrewery: Brewery | null }>()
);

export const brewerySelected = createAction(
  SearchAction.BREWERY_SELECTED,
  props<{ selectedBrewery: Brewery }>()
);

export const setSearchHistory = createAction(
  SearchAction.SET_SEARCH_HISTORY,
  props<{ searchHistory: SearchHistory[] }>()
);

export const searchSuccess = createAction(
  SearchAction.SEARCH_SUCCESSFUL,
  props<{ searchBreweryResponse: Brewery[] }>()
);

export const searchFail = createAction(
  SearchAction.SEARCH_FAIL,
  props<{ error: HttpErrorResponse }>()
);
