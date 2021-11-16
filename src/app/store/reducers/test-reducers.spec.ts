import * as fromReducer from './reducers';
import * as fromActions from '../actions/actions'
import {initialApplicationState, SearchBreweryRequest} from "../models/model";
import {DEFAULT_SEARCH_LIMIT} from "../../components/search-components/brewery-list/brewery-list.constants";

describe('Test Reducers', () => {

  it('should return the default state', () => {
    const initialState = initialApplicationState.searchBrewery;
    const state = fromReducer.reducer(initialApplicationState.searchBrewery, {type: ''});
    expect(state).toBe(initialState);
  });

  it('should save and update store on searchBrewery', () => {
    const initialState = initialApplicationState.searchBrewery;
    const searchBreweryRequest: SearchBreweryRequest = {query: 'Search', limit: DEFAULT_SEARCH_LIMIT};
    const action = fromActions.searchBrewery(searchBreweryRequest);
    const state = fromReducer.reducer(initialState, action);

    expect(state.searchBreweryRequest.query).toEqual(searchBreweryRequest.query);
    expect(state.searchBreweryRequest.limit).toEqual(searchBreweryRequest.limit);
  });
});
