import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { ENVIRONMENT, IEnvironment } from 'src/environments/common'
import { SearchItem } from '../models/search-item'
import { BaseRestService } from '../shared/basedRestService'

@Injectable({
  providedIn: 'root'
})
export class SearchService extends BaseRestService {

  constructor(httpClient: HttpClient, @Inject(ENVIRONMENT) private environment: IEnvironment) {
    super(httpClient)
   }

   public searchItems(itemsPerPage: number, searchWord: string) {
    const url = this.environment.configuration.api.baseSearchUrl + itemsPerPage + '&query=' + searchWord
    return super.get<SearchItem[]>(url)
}
}
