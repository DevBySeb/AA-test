import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { SavedSearchesProviderService } from 'src/app/modules/search/services/saved-searches-provider.service';
import { SearchDataPrams } from './models/search-data-provider.interface';
import { SearchData } from './models/search-data.model';
import { BreweriesDataProviderService } from './services/breweries-data-provider.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private resultsCount$ = new BehaviorSubject<number>(5);
  searchForm: FormGroup;
  resultsData$: Observable<SearchData[]>;
  searchDataDetails?: SearchData;
  showingAllResults = false;

  constructor(private fb: FormBuilder, private dataProvider: BreweriesDataProviderService, private localStorage: SavedSearchesProviderService) {
    this.searchForm = this.fb.group({
      search: ['', Validators.required]
    });;

    this.resultsData$ = combineLatest([
      this.searchForm.get('search')!.valueChanges.pipe(
        startWith(this.searchForm.get('search')!.value),
        debounceTime(250),
        tap(() => {
          this.showingAllResults = false;
          this.resultsCount$.next(5);
        }),
      ),
      this.resultsCount$.pipe(
        distinctUntilChanged()
      )
    ]).pipe(
      map(([query, count]): SearchDataPrams => ({ query, limit: count })),
      switchMap(searchParams => searchParams.query ? this.dataProvider.getData(searchParams) : of([])),
    )
  }

  ngOnInit(): void {

  }

  onShowAllResults(count: number) {
    this.resultsCount$.next(count);
    this.showingAllResults = true;
  }

  onSelectedResult(searchData: SearchData) {
    this.searchDataDetails = searchData;
    this.localStorage.addItem({ ...searchData, timestamp: Date.now() });
  }

  onCloseDetails() {
    this.searchDataDetails = undefined;
  }

  onSelectSearchHistoryItem(searchData: SearchData) {
    this.searchDataDetails = searchData;
  }

  get hasSavedSearches(): boolean {
    return !!this.localStorage.getItems().length;
  }
}
