import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {ApplicationReducer} from './reducers/reducers';
import {ApplicationState} from "./models/model";
import {environment} from "../../environments/environment";

export const reducers: ActionReducerMap<ApplicationState> = {
  searchBrewery: ApplicationReducer,
};

export const metaReducers: MetaReducer<ApplicationState>[] = !environment.production ? [] : [];
