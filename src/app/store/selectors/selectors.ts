import {ApplicationState, SearchBrewery} from "../models/model";
import {createSelector} from "@ngrx/store";


export const SearchBrewerySelector = (state: ApplicationState) => state.searchBrewery;

export const selectBreweryRequest = createSelector(
  SearchBrewerySelector,
  (state: SearchBrewery) => state.searchBreweryRequest
);

export const selectBreweryResponse = createSelector(
  SearchBrewerySelector,
  (state: SearchBrewery) => state.searchBreweryResponse
);

export const selectError = createSelector(
  SearchBrewerySelector,
  (state: SearchBrewery) => state.error
);

export const selectIsLoading = createSelector(
  SearchBrewerySelector,
  (state: SearchBrewery) => state.isLoading
);

export const selectSearchHistory = createSelector(
  SearchBrewerySelector,
  (state: SearchBrewery) => state.searchHistory
);

export const selectView = createSelector(
  SearchBrewerySelector,
  (state: SearchBrewery) => state.view
);

export const selectSelectedBrewery = createSelector(
  SearchBrewerySelector,
  (state: SearchBrewery) => state.selectedBrewery
);
