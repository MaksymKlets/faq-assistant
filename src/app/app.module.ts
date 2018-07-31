import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/root/app.component';
import { FaqAssistantComponent } from './components/faq-assistant/faq-assistant.component';
import { TitleService } from './services/title/title.service';
import {ItemManager} from './item-manager/item-manager';
import { FinalAnswerComponent } from './components/final-answer/final-answer.component';

@NgModule({
  declarations: [
    AppComponent,
    FaqAssistantComponent,
    FinalAnswerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TitleService, ItemManager],
  bootstrap: [AppComponent],
  entryComponents: [FinalAnswerComponent]
})
export class AppModule { }
