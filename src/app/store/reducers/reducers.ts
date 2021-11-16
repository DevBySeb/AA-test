import {Action, createReducer, on} from '@ngrx/store';
import {initialApplicationState, SearchBrewery} from '../models/model';
import {
  searchBrewery,
  searchFail,
  searchSuccess,
  setSearchHistory,
  setSelectedBrewery,
  setView
} from '../actions/actions';
import {CARD_STATE} from "../../components/search-components/brewery-list/brewery-list.constants";

export const reducer = createReducer(
  initialApplicationState.searchBrewery as SearchBrewery,
  on(searchBrewery, (state, searchRequest) => ({
    ...state,
    searchBreweryRequest: {...searchRequest, limit: searchRequest.limit},
    error: null,
    isLoading: true
  })),
  on(searchSuccess, (state, searchResponse) => ({
    ...state,
    searchBreweryResponse: searchResponse.searchBreweryResponse,
    error: null,
    isLoading: false,
    view: CARD_STATE.SEARCH_LIST
  })),
  on(searchFail, (state, {error}) => ({
    ...state,
    searchBreweryResponse: [],
    error: error,
    isLoading: false
  })),
  on(setView, (state, {view}) => ({
    ...state,
    view
  })),
  on(setSelectedBrewery, (state, {selectedBrewery}) => ({
    ...state,
    selectedBrewery
  })),
  on(setSearchHistory, (state, {searchHistory}) => ({
    ...state,
    searchHistory
  }))
);

export function ApplicationReducer(state: SearchBrewery, action: Action): SearchBrewery {
  return reducer(state as SearchBrewery, action as Action);
}

