import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { }

  searchQuery(query:string,page:number):Observable<any>{
    return this.http.get(`https://api.openbrewerydb.org/breweries/search?page=1&per_page=${page}&query=${query}`)
  }

}
