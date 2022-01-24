import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchData } from '../../models/search-data.model';

@Component({
  selector: 'app-search-result-details',
  templateUrl: './search-result-details.component.html',
  styleUrls: ['./search-result-details.component.scss']
})
export class SearchResultDetailsComponent implements OnInit {
  @Input() searchData?: SearchData
  @Output() detailsClose = new EventEmitter<void>()
  constructor() { }

  ngOnInit(): void {
  }

  closeDetails() {
    this.detailsClose.emit();
  }
}
