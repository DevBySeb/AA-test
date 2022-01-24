import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  private overlayVisibe: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  getOverlayVisible(): Observable<boolean> {
    return this.overlayVisibe.asObservable();
  }

  showOverlay() {
    this.overlayVisibe.next(true);
  }

  hideOverlay() {
    this.overlayVisibe.next(false);
  }
}
