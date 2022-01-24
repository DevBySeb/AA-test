import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { OverlayService } from 'src/app/services/overlay.service';
import { SearchData } from '../../models/search-data.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  @Input() results: SearchData[] = [];
  @Input() showAllResultsButton = true;
  @Output() showAllResults = new EventEmitter<number>();
  @Output() selectedResult = new EventEmitter<SearchData>();

  constructor(private overlayService: OverlayService) { }

  ngOnInit(): void {
    this.overlayService.showOverlay();
  }

  ngOnDestroy(): void {
    this.overlayService.hideOverlay();
  }

  onShowAllResults() {
    this.showAllResults.emit(10);
  }

  onResultSelect(searchResult: SearchData) {
    this.selectedResult.emit(searchResult);
  }
}
