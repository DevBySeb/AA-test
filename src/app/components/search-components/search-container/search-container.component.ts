import {Component} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {selectError, selectView} from "../../../store/selectors/selectors";
import {Observable} from "rxjs";
import {ApplicationState} from "../../../store/models/model";
import {CARD_STATE} from "../brewery-list/brewery-list.constants";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent {
  readonly CARD_STATE = CARD_STATE;
  error$: Observable<HttpErrorResponse | null> = this.store.select(selectError);
  cardState$: Observable<CARD_STATE> = this.store.pipe(select(selectView));

  constructor(private store: Store<ApplicationState>) {
  }

}
