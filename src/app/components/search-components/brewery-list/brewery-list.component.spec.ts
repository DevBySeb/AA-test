import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BreweryListComponent} from './brewery-list.component';
import {FormatDatePipe} from "../../../shared/pipes/format-date.pipe";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {Brewery, initialApplicationState} from "../../../store/models/model";
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {selectBreweryResponse} from "../../../store/selectors/selectors";
import {brewerySelected, setView} from "../../../store/actions/actions";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {CARD_STATE} from "../search-container/search-container.constants";

describe('BreweryListComponent', () => {
  let component: BreweryListComponent;
  let fixture: ComponentFixture<BreweryListComponent>;
  let store: MockStore;
  const searchBreweryResponse: Brewery[] = [
    {
      id: "f-town-brewing-company-faribault",
      name: "F-Town Brewing Company",
      brewery_type: "micro",
      street: "22 4th St NE",
      address_2: 'null',
      address_3: 'null',
      city: "Faribault",
      state: "Minnesota",
      county_province: 'null',
      postal_code: "55021-5207",
      country: "United States",
      longitude: "-93.26734492",
      latitude: "44.29499775",
      phone: "5073317677",
      website_url: "http://www.ftownbeer.com",
      updated_at: "2021-10-23T02:24:55.243Z",
      created_at: "2021-10-23T02:24:55.243Z"
    },
    {
      id: "2-basset-brewery-white-sulphur-springs",
      name: "2 Basset Brewery",
      brewery_type: "micro",
      street: "202 E Main St",
      address_2: 'null',
      address_3: 'null',
      city: "White Sulphur Springs",
      state: "Montana",
      county_province: 'null',
      postal_code: "59645-9081",
      country: "United States",
      longitude: "-110.9004865",
      latitude: "46.54807609",
      phone: "4065472337",
      website_url: "http://www.2bassetbrewery.com",
      updated_at: "2021-10-23T02:24:55.243Z",
      created_at: "2021-10-23T02:24:55.243Z"
    }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatListModule, MatIconModule],
      declarations: [BreweryListComponent, FormatDatePipe],
      providers: [provideMockStore({initialState: initialApplicationState})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and show Brewery List', () => {
    expect(component).toBeTruthy();
    expect(component.breweryList).toEqual([]);
    let breweryListElements = fixture.debugElement.queryAll(By.css('mat-list-option'));
    let breweryListElementNameArray = breweryListElements.map((element: DebugElement) => element.nativeElement.innerText);
    expect(breweryListElementNameArray).toEqual([]);
    store.overrideSelector(selectBreweryResponse, searchBreweryResponse);
    store.refreshState();
    fixture.detectChanges();
    breweryListElements = fixture.debugElement.queryAll(By.css('mat-list-option'));
    breweryListElementNameArray = breweryListElements.map((element: DebugElement) => element.nativeElement.innerText.trim());
    expect(component.breweryList).toEqual(searchBreweryResponse);
    expect(breweryListElementNameArray).toEqual(searchBreweryResponse.map(entry => entry.name));
  });

  it('should dispatch brewerySelected when native element clicked', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const handleBreweryListElementClickSpy = spyOn(component, 'handleBreweryListElementClick').and.callThrough();
    store.overrideSelector(selectBreweryResponse, searchBreweryResponse);
    store.refreshState();
    fixture.detectChanges();
    const breweryListElement = fixture.debugElement.query(By.css('mat-list-option'));
    breweryListElement.triggerEventHandler('click', null);
    expect(handleBreweryListElementClickSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(brewerySelected({selectedBrewery: searchBreweryResponse[0]}));
    expect(dispatchSpy).toHaveBeenCalledWith(setView({view: CARD_STATE.BREWERY_DETAIL}));
  });

});
