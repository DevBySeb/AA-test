import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BreweriesDataProviderService, Brewery } from './breweries-data-provider.service';

describe('BreweriesDataProviderService', () => {
  let service: BreweriesDataProviderService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BreweriesDataProviderService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('call API and return mapped data', () => {
    const queryParams = { query: 'abc', limit: 7 }
    const mockedData: Partial<Brewery>[] = [
      {
        id: 123,
        name: 'Test Brewery',
        street: 'Test Street 321'
      }
    ];
    service.getData(queryParams).subscribe(results => {
      expect(results).toEqual([
        {
          id: mockedData[0].id!,
          title: mockedData[0].name!,
          details: mockedData[0].street!
        }
      ]);
    });

    const req = httpController.expectOne(({ url, params }) => {
      expect(url).toMatch(/\/breweries\/search$/);
      expect(params.get('per_page')).toEqual(queryParams.limit.toString());
      expect(params.get('query')).toEqual(queryParams.query);
      return true;
    });


    req.flush(mockedData);
  });
});
