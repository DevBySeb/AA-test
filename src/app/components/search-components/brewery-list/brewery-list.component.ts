import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {selectBreweryRequest, selectBreweryResponse} from "../../../store/selectors/selectors";
import {ApplicationState, Brewery, SearchBreweryRequest} from "../../../store/models/model";
import {Subscription} from "rxjs";
import {
  DEFAULT_SEARCH_LIMIT,
  MAX_SEARCH_LIMIT,
  NO_ELEMENTS_FOUND
} from "./brewery-list.constants";
import {brewerySelected, searchBrewery, setView} from "../../../store/actions/actions";
import {MatSelectionListChange} from '@angular/material/list';
import {CARD_STATE} from "../search-container/search-container.constants";


@Component({
  selector: 'app-brewery-list',
  templateUrl: './brewery-list.component.html',
  styleUrls: ['./brewery-list.component.scss']
})
export class BreweryListComponent implements OnInit, OnDestroy {
  readonly NO_ELEMENTS_FOUND = NO_ELEMENTS_FOUND;
  readonly MAX_SEARCH_LIMIT = MAX_SEARCH_LIMIT;
  subscription?: Subscription;
  breweryList: Brewery[] = [];
  searchRequest: SearchBreweryRequest = {
    query: '',
    limit: DEFAULT_SEARCH_LIMIT,
  };

  constructor(private store: Store<ApplicationState>) {
  }

  ngOnInit(): void {
    this.subscription = this.getBreweryListSubscription();
    this.subscription.add(this.getSearchRequestSubscription());
  }

  getBreweryListSubscription(): Subscription {
    return this.store.pipe(select(selectBreweryResponse))
      .subscribe((searchBreweryResponse) => {
        this.breweryList = searchBreweryResponse;
      });
  }

  getSearchRequestSubscription(): Subscription {
    return this.store.pipe(select(selectBreweryRequest)).subscribe((searchBreweryRequest) => {
      this.searchRequest = searchBreweryRequest;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  handleBreweryListElementClick(event: MatSelectionListChange): void {
    this.store.dispatch(setView({view: CARD_STATE.BREWERY_DETAIL}));
    this.store.dispatch(brewerySelected({selectedBrewery: event.options[0].value}));
  }


  fetchCompleteBreweryList(): void {
    const searchRequest: SearchBreweryRequest = {
      query: this.searchRequest.query,
      limit: MAX_SEARCH_LIMIT
    }
    this.store.dispatch(searchBrewery(searchRequest));
  }

  isShowAllResultButtonVisible(): boolean{
    return (this.breweryList.length === DEFAULT_SEARCH_LIMIT) && (this.searchRequest.limit !== MAX_SEARCH_LIMIT);
  }

  isNoBreweryFound():boolean {
    return (this.breweryList.length === 0) && (this.searchRequest?.query !== '');
  }
}
