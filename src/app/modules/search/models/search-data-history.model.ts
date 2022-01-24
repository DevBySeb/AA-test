import { SearchData } from "./search-data.model";

export interface SearchHistory extends SearchData {
    timestamp: number,
}
