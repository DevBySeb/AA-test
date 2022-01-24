import { Observable } from "rxjs";
import { SearchData } from "./search-data.model";

export interface SearchDataPrams {
    query: string;
    limit: number;
}

export interface SearchDataProvider {
    getData(params: SearchDataPrams) : Observable<SearchData[]>
}
