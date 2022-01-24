import { Component, ElementRef, forwardRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AsyncSubject, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchInputComponent),
      multi: true
    }
  ]
})
export class SearchInputComponent implements OnInit, ControlValueAccessor, OnDestroy {
  searchInputFormControl: FormControl = new FormControl();
  private onChange: any;
  private onTouched: any;
  private destroy$ = new Subject<void>();

  constructor() { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: string): void {
    this.searchInputFormControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;

    this.searchInputFormControl.valueChanges.pipe(
      tap((value: string) => this.onChange(value)),
      takeUntil(this.destroy$)
    ).subscribe();
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
