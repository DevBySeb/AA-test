import { DatePipe } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { searchResult, searchedItem } from '../../models/models';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchForm = this.fb.group({
    search: [''],
  });
  isLoading: boolean = false;
  searchResult: searchResult[] = [];
  searchHistory: any[] = [];
  page = {
    default: 5,
    maximum: 10,
  };
  selectedItem: any = {};
  showExpandedView: boolean = false;
  showMore: boolean = false;
  showSearchResults: boolean = false;
  keyupSubject = new Subject();

  constructor(
    private fb: FormBuilder,
    private searchservice: SearchService,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getSearchHistory();
    this.keyupSubject
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
        )
      .subscribe((searchtoken: any) => {
        if (searchtoken) {
          this.onSubmit();
        } else {
          this.close();
        }
      });
  }

  searchTerm(e: any) {
    let searchToken = e.target.value;
    this.keyupSubject.next(searchToken);
  }
  /*
    Function description - Fetches the previously searched history from local storage
    Arguments/Returns - none
  */
  getSearchHistory() {
    let searchHistoryList = localStorage.getItem('searchHistoryList');
    if (searchHistoryList) {
      this.searchHistory = JSON.parse(searchHistoryList);
    }
  }
  /*
    Function description - Saves the searched term in local storage
    Arguments/Returns - none
  */
  setSearchHistory() {
    localStorage.setItem(
      'searchHistoryList',
      JSON.stringify(this.searchHistory)
    );
  }

  onSubmit() {
    this.getResults(this.page.default);
    this.showMore = true;
    this.showExpandedView = false;
  }
  /*
    Function description - Gets all the results for user entered keyword
    Arguments - number of records to be fetched
    Returns - none
  */
  getResults(pageSize: any) {
    this.isLoading = true;
    this.showSearchResults = false;
    this.searchservice
      .searchQuery(this.searchForm.value.search, pageSize)
      .subscribe(
        (d) => {
          this.searchResult = d;
          if (!this.searchResult.length) {
            this.showMore = false;
          }
          this.showSearchResults = true;
        },
        (err) => {
          console.log('Error', err);
        },
        () => {
          this.isLoading = false;
        }
      );
  }
  /*
    Function description - Fetches/displays maximimum of 10 records for the searched term
    Arguments/Returns - none
  */
  showAll() {
    this.showMore = false;
    this.getResults(this.page.maximum);
  }
  /*
    Function description- 1. Shows the expanded view when any searched item is clicked.
                          2. Adds the searched tearm with date[format:2019-12-12 15:00 AM]/time in local storage.
    Arguments- unique identity of the selected search term
    Returns- none
  */
  showFullSearch(id: string) {
    this.showExpandedView = true;
    this.selectedItem = this.searchResult.find((e) => e.id == id);
    this.searchHistory.push({
      name: this.selectedItem.name,
      date:
        this.datepipe.transform(new Date(), 'yyyy-MM-dd') +
        ' ' +
        this.datepipe.transform(new Date(), 'shortTime'),
    });
    this.setSearchHistory();
  }
  /*
    Function description - Closes the expanded view for selected search item. Resets the previous search results
    Arguments/Returns - none
  */
  close() {
    this.showExpandedView = false;
    this.resetSearchList();
  }
  /*
    Function description - Resets the previous search results
    Arguments/Returns - none
  */
  resetSearchList() {
    this.searchResult = [];
    this.showMore = false;
    this.showSearchResults = false;
  }
}
