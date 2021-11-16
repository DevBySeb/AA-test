import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BreweryDetailComponent} from './brewery-detail.component';
import {provideMockStore} from "@ngrx/store/testing";
import {initialApplicationState} from "../../../store/models/model";

describe('BreweryDetailComponent', () => {
  let component: BreweryDetailComponent;
  let fixture: ComponentFixture<BreweryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreweryDetailComponent],
      providers: [provideMockStore({initialState: initialApplicationState})],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
