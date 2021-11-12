import {Component, OnInit} from '@angular/core';
import {ApplicationState, SearchBreweryRequest} from "../../../store/models/model";
import {select, Store} from "@ngrx/store";
import {searchBrewery} from "../../../store/actions/actions";
import {selectBreweryRequest} from "../../../store/selectors/selectors";
import {DEFAULT_SEARCH_LIMIT} from "../brewery-list/brewery-list.constants";


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchRequest: SearchBreweryRequest | undefined;
  searchText = '';

  constructor(private store: Store<ApplicationState>,
  ) {
  }

  search(): void {
    this.store.dispatch(searchBrewery(
      {query: this.searchText.trim(), limit: this.searchRequest?.limit || DEFAULT_SEARCH_LIMIT}));
  }

  ngOnInit(): void {
    this.store.pipe(select(selectBreweryRequest)).subscribe((searchRequest) => {
      this.searchRequest = searchRequest;
    });
  }


}
