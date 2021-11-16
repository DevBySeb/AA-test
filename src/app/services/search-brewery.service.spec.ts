import {TestBed} from '@angular/core/testing';

import {SearchBreweryService} from './search-brewery.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SearchBreweryService', () => {
  let service: SearchBreweryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SearchBreweryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
