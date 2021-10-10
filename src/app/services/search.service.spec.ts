import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ENVIRONMENT } from 'src/environments/common';
import { environment } from 'src/environments/environment';

import { SearchService } from './search.service';

describe('SearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [{
      provide: ENVIRONMENT,
      useValue: environment
    }]
  }));

  it('should be created', () => {
    const service: SearchService = TestBed.get(SearchService);
    expect(service).toBeTruthy();
  });
});
