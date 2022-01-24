import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OverlayService } from '../../services/overlay.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent {
  constructor(private overlayService: OverlayService) {
  }

  get isOverlayVisible(): Observable<boolean> {
    return this.overlayService.getOverlayVisible();
  }

}
