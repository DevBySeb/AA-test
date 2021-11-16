import {Component} from '@angular/core';
import {ApplicationState, Brewery} from "../../../store/models/model";
import {select, Store} from "@ngrx/store";
import {CARD_STATE} from "../brewery-list/brewery-list.constants";
import {setSelectedBrewery, setView} from "../../../store/actions/actions";
import {selectSelectedBrewery} from "../../../store/selectors/selectors";
import {Observable} from "rxjs";


@Component({
  selector: 'app-brewery-detail',
  templateUrl: './brewery-detail.component.html',
  styleUrls: ['./brewery-detail.component.scss']
})
export class BreweryDetailComponent {
  brewery$: Observable<Brewery | null> = this.store.pipe(select(selectSelectedBrewery));

  constructor(private store: Store<ApplicationState>) {
  }

  closeBreweryDetailView(): void {
    this.store.dispatch(setView({view: CARD_STATE.SEARCH_HISTORY}));
    this.store.dispatch(setSelectedBrewery({selectedBrewery: null}));
  }
}
