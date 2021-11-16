import {Component} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {selectError, selectView} from "../../../store/selectors/selectors";
import {Observable} from "rxjs";
import {ApplicationState} from "../../../store/models/model";
import {HttpErrorResponse} from "@angular/common/http";
import {CARD_STATE, ENTER_SEARCH_TEXT} from "./search-container.constants";

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent {
  readonly ENTER_SEARCH_TEXT = ENTER_SEARCH_TEXT;
  readonly CARD_STATE = CARD_STATE;
  error$: Observable<HttpErrorResponse | null> = this.store.select(selectError);
  cardState$: Observable<CARD_STATE> = this.store.pipe(select(selectView));

  constructor(private store: Store<ApplicationState>) {
  }

}
