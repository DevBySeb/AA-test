import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { HomeContainerComponent } from './home-container.component'
import { BrowserModule, By } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ENVIRONMENT } from 'src/environments/common';
import { environment } from 'src/environments/environment';

describe('HomeContainerComponent', () => {
  let component: HomeContainerComponent;
  let fixture: ComponentFixture<HomeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeContainerComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ReactiveFormsModule, HttpClientModule, BrowserModule],
      providers: [
        {
          provide: ENVIRONMENT,
          useValue: environment
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', async (() => {
    component.searchForm.controls['searchTextControl'].setValue('')
    expect(component.searchForm.valid).toBeFalsy();
  }));

  it('initial number of attempts is 5', async (() => {
    expect(component.maxNumberOfItems).toEqual(5)
  }));

  it('initial fetched items number is zero', async (() => {
    expect(component.searchItemsFetched.length).toEqual(0)
  }));

  it('all items requested initially is false', async (() => {
    expect(component.allItemsRequested).toEqual(false)
  }));

  it('logo should be displayed', async (() => {
    const element = fixture.debugElement.nativeElement.querySelector("#logo");
    expect(element['src']).toContain('aa-test-logo.svg')
  }));
  
});
