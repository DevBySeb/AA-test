import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchModule } from './modules/search/search.module';
import { HeaderComponent } from './components/header/header.component';
import { OverlayComponent } from './components/overlay/overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OverlayComponent,
  ],
  imports: [
    BrowserModule,
    SearchModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
