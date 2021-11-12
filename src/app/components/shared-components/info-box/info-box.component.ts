import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent {
  @Input() error$?: Observable<HttpErrorResponse | null>
  @Input() message?: string;

  constructor() {
  }

}
