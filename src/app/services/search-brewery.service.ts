import {Injectable} from '@angular/core';
import {Brewery, SearchBreweryRequest} from "../store/models/model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchBreweryService {

  constructor(private http: HttpClient) {
  }

  getSearchBreweryURL({query, limit}: SearchBreweryRequest): string {
    return `https://api.openbrewerydb.org/breweries/search?page=1&per_page=${limit}&query=${query}`;
  }

  getSearchBreweryRequest(searchBreweryRequest: SearchBreweryRequest) {
    const searchBreweryURL = this.getSearchBreweryURL(searchBreweryRequest);
    return this.http.get<Brewery[]>(searchBreweryURL);
  }
}
