import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/root/app.component';
import { FaqAssistantComponent } from './components/faq-assistant/faq-assistant.component';
import { TitleService } from './services/title/title.service';
import {ItemManager} from './item-manager/item-manager';

@NgModule({
  declarations: [
    AppComponent,
    FaqAssistantComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TitleService, ItemManager],
  bootstrap: [AppComponent]
})
export class AppModule { }
