import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ModuleWithProviders} from '@angular/core';
import {FaqAssistantComponent} from './components/faq-assistant/faq-assistant.component';
import {FaqAssistantButtonComponent} from './components/faq-assistant-button/faq-assistant-button.component';
import {FaqItemListService} from './services/faq-item-list.service';
import {FaqAssistantService} from './services/faq-assistant.service';

@NgModule({
  declarations: [
    FaqAssistantComponent,
    FaqAssistantButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    FaqAssistantComponent,
    FaqAssistantButtonComponent
  ]
})
export class FaqAssistantModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FaqAssistantModule,
      providers: [
        FaqItemListService,
        FaqAssistantService
      ]
    };
  }
}
