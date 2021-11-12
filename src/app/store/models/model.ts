import {CARD_STATE, DEFAULT_SEARCH_LIMIT} from "../../components/search-components/brewery-list/brewery-list.constants";
import {HttpErrorResponse} from "@angular/common/http";

export interface SearchBrewery {
  searchBreweryRequest: SearchBreweryRequest;
  searchBreweryResponse: Brewery[];
  error: HttpErrorResponse | null;
  isLoading: boolean;
  view: CARD_STATE;
  selectedBrewery: Brewery | null;
  searchHistory: SearchHistory[];
}

export interface ApplicationState {
  searchBrewery: SearchBrewery | any;
}


export const initialApplicationState: ApplicationState = {
  searchBrewery: {
    searchBreweryRequest: {
      query: '',
      limit: DEFAULT_SEARCH_LIMIT
    },
    searchBreweryResponse: [],
    error: null,
    isLoading: false,
    view: CARD_STATE.SEARCH_LIST,
    selectedBrewery: null,
    searchHistory: []
  }
};

export interface SearchBreweryRequest {
  query: string;
  limit: number;
}

export interface SearchHistory {
  query: string;
  datetime: number;
}

export interface Brewery {
  id: string;
  name: string;
  brewery_type: string;
  street: string;
  address_2: string;
  address_3: string;
  city: string;
  state: string;
  county_province: string;
  postal_code: string;
  country: string;
  longitude: string;
  latitude: string;
  phone: string;
  website_url: string;
  updated_at: string;
  created_at: string;
}
