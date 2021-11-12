import {Component, OnInit} from '@angular/core';
import {ApplicationState} from "./store/models/model";
import {Store} from "@ngrx/store";
import {loadSearchHistory} from "./store/actions/actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AA-test';

  constructor(private store: Store<ApplicationState>) {
  }

  ngOnInit() {
    this.store.dispatch(loadSearchHistory());
  }
}
