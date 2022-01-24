import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchDataPrams, SearchDataProvider } from '../models/search-data-provider.interface';
import { SearchData } from '../models/search-data.model';

export interface Brewery {
  id: number,
  name: string,
  street: string,
  city: string,
  state: string,
  country: string,
  phone: string,
}

@Injectable({
  providedIn: 'root'
})
export class BreweriesDataProviderService implements SearchDataProvider {

  constructor(private http: HttpClient) { }

  getData({ query, limit }: SearchDataPrams): Observable<SearchData[]> {
    const APIUrl = environment.openBreweryDbUrl;

    return this.http.get<Brewery[]>(
      `${APIUrl}/breweries/search`,
      {
        params: {
          page: 1,
          per_page: limit.toString(),
          query
        }
      }
    ).pipe(
      map(breweries => breweries.map(this.mapBreweryToSearchData))
    );
  }

  private mapBreweryToSearchData(brewery: Brewery): SearchData {
    return {
      id: brewery.id,
      title: brewery.name,
      details: brewery.street
    }
  }
}
