import * as Actions from './actions'
import {SearchBreweryRequest} from "../models/model";
import {DEFAULT_SEARCH_LIMIT} from "../../components/search-components/brewery-list/brewery-list.constants";

describe('Test Actions', () => {
  const searchBreweryRequest: SearchBreweryRequest = {query: 'Search', limit: DEFAULT_SEARCH_LIMIT};

  it('should create a searchBrewery action', () => {
    const action = Actions.searchBrewery(searchBreweryRequest);

    expect(action).toEqual({
      type: Actions.SearchAction.SEARCH_BREWERY,
      query: searchBreweryRequest.query,
      limit: searchBreweryRequest.limit
    });
  });

});
