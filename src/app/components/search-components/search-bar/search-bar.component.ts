import {Component} from '@angular/core';
import {ApplicationState} from "../../../store/models/model";
import {Store} from "@ngrx/store";
import {searchBrewery} from "../../../store/actions/actions";
import {DEFAULT_SEARCH_LIMIT} from "../brewery-list/brewery-list.constants";
import {FormControl, Validators} from "@angular/forms";


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  public searchControl = new FormControl('', Validators.required);

  constructor(private store: Store<ApplicationState>,
  ) {
  }

  search(): void {
    if (this.searchControl.valid) {
      this.store.dispatch(searchBrewery(
        {query: this.searchControl.value.trim(), limit: DEFAULT_SEARCH_LIMIT}));
    }
  }


}
