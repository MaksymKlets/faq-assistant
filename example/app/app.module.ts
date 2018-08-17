import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {FaqModule} from '../../projects/faq-assistant/src/public_api';
import {ItemManagerService} from '../../projects/faq-assistant/src/public_api';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    FaqModule
  ],
  providers: [ItemManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
