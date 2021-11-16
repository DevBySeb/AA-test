import {TestBed} from '@angular/core/testing';

import {SearchBreweryService} from './search-brewery.service';

describe('SearchBreweryService', () => {
  let service: SearchBreweryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchBreweryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
