import { Component, Input, OnInit } from '@angular/core';
import { SearchData } from '../../models/search-data.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  @Input() result?: SearchData;
  constructor() { }

  ngOnInit(): void {
  }

}
