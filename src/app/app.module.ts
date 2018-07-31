import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FaqAssistantComponent } from './shared/faq-assistant/faq-assistant.component';
import { ItemManager } from './shared/item-manager/item-manager';

@NgModule({
  declarations: [
    AppComponent,
    FaqAssistantComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ItemManager],
  bootstrap: [AppComponent]
})
export class AppModule { }
