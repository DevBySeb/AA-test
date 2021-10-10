import { Component } from '@angular/core';
import { SearchItem } from 'src/app/models/search-item';
import { SearchService } from 'src/app/services/search.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent{

  searchItemsFetched = new Array<SearchItem>();
  itemSelected: SearchItem
  allItemsRequested: boolean = false
  maxNumberOfItems: number = 5

  constructor(private searchService: SearchService, private formBuilder: FormBuilder) { 

  }
  
  searchForm: FormGroup = this.formBuilder.group({
    searchTextControl: new FormControl('', [Validators.required])
  })

  get searchTextControl(): FormControl {
    return this.searchForm.get('searchTextControl') as FormControl
  }

  retrieveAllItems(value: boolean) {
    this.allItemsRequested = value
    this.maxNumberOfItems = 10
    this.readInput(this.searchForm.controls.searchTextControl.value)
  }

  sendItemDescription(item: SearchItem) {
    this.itemSelected = item
    this.searchForm.controls.searchTextControl.reset()
  }

  readInput(searchValue: string) {
    if(searchValue.length > 3){
      this.searchService.searchItems(this.maxNumberOfItems, searchValue).subscribe(result => {
        this.searchItemsFetched = result
      })
    } else {
      this.searchItemsFetched = []
      this.maxNumberOfItems = 5
    }
  }

}
