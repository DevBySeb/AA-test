import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ApplicationState, SearchHistory} from "../../../store/models/model";
import {select, Store} from "@ngrx/store";
import {selectSearchHistory} from "../../../store/selectors/selectors";
import {setSearchHistory, setView} from "../../../store/actions/actions";
import {CARD_STATE} from "../search-container/search-container.constants";

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss']
})
export class SearchHistoryComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  searchHistory: SearchHistory[] = [];

  constructor(private store: Store<ApplicationState>) {
  }

  ngOnInit(): void {
    this.subscription = this.getSearchHistorySubscription();
  }

  getSearchHistorySubscription(): Subscription {
    return this.store.pipe(select(selectSearchHistory)).subscribe(searchHistory => {
      this.searchHistory = searchHistory;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  removeBreweryHistoryElement(index: number): void {
    const updatedSearchHistory = [...this.searchHistory];
    updatedSearchHistory.splice(index, 1);
    this.store.dispatch(setSearchHistory({searchHistory: updatedSearchHistory}));
    if (updatedSearchHistory.length === 0) {
      this.store.dispatch(setView({view: CARD_STATE.NONE}));
    }
  }
}
