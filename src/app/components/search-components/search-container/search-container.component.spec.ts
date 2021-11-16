import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchContainerComponent} from './search-container.component';
import {provideMockStore} from "@ngrx/store/testing";
import {initialApplicationState} from "../../../store/models/model";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('SearchContainerComponent', () => {
  let component: SearchContainerComponent;
  let fixture: ComponentFixture<SearchContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchContainerComponent],
      providers: [provideMockStore({initialState: initialApplicationState})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
