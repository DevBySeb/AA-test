import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {selectBreweryRequest, selectBreweryResponse} from "../../../store/selectors/selectors";
import {ApplicationState, Brewery, SearchBreweryRequest} from "../../../store/models/model";
import {Subscription} from "rxjs";
import {
  CARD_STATE,
  DEFAULT_SEARCH_LIMIT,
  ENTER_SEARCH_TEXT,
  MAX_SEARCH_LIMIT,
  NO_ELEMENTS_FOUND
} from "./brewery-list.constants";
import {brewerySelected, searchBrewery, setView} from "../../../store/actions/actions";
import {MatSelectionListChange} from '@angular/material/list';


@Component({
  selector: 'app-brewery-list',
  templateUrl: './brewery-list.component.html',
  styleUrls: ['./brewery-list.component.scss']
})
export class BreweryListComponent implements OnInit, OnDestroy {
  readonly NO_ELEMENTS_FOUND = NO_ELEMENTS_FOUND;
  readonly ENTER_SEARCH_TEXT = ENTER_SEARCH_TEXT;
  readonly MAX_SEARCH_LIMIT = MAX_SEARCH_LIMIT;
  subscription: Subscription | undefined;
  breweryList: Brewery[] = [];
  searchRequest: SearchBreweryRequest = {
    query: '',
    limit: DEFAULT_SEARCH_LIMIT,
  };

  constructor(private store: Store<ApplicationState>) {
  }

  ngOnInit(): void {
    this.subscription = this.store.pipe(select(selectBreweryResponse))
      .subscribe((searchBreweryResponse) => {
        this.breweryList = searchBreweryResponse;
      });

    const requestSubscription = this.store.pipe(select(selectBreweryRequest)).subscribe((searchBreweryRequest) => {
      // if the search text has changed reset the breweryList
      if (searchBreweryRequest.query !== this.searchRequest.query) {
        this.breweryList = [];
      }
      this.searchRequest = searchBreweryRequest;
    });
    this.subscription.add(requestSubscription);

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  handleSelectionChange(event: MatSelectionListChange): void {
    this.store.dispatch(setView({view: CARD_STATE.BREWERY_DETAIL}));
    this.store.dispatch(brewerySelected({selectedBrewery: event.options[0].value}));
  }


  fetchCompleteList(): void {
    const searchRequest: SearchBreweryRequest = {
      query: this.searchRequest.query,
      limit: MAX_SEARCH_LIMIT
    }
    this.store.dispatch(searchBrewery(searchRequest));
  }


}
