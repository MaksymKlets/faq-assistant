import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FaqAssistantModule} from './faq-assistant/faq-assistant.module';
import {EntryComponent} from './faq-assistant/components/entry/entry.component';


@NgModule({
  declarations: [
    AppComponent,
    EntryComponent
  ],
  imports: [
    BrowserModule,
    FaqAssistantModule.forRoot()
  ],
  providers: [],
  entryComponents: [EntryComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
