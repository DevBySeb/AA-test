import {Component} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {ApplicationState} from "../../../store/models/model";
import {selectIsLoading} from "../../../store/selectors/selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  isLoading$: Observable<boolean> = this.store.pipe(select(selectIsLoading));

  constructor(private store: Store<ApplicationState>) {
  }

}
