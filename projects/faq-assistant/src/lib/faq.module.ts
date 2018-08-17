import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FaqAssistantComponent} from './shared/faq-assistant/faq-assistant.component';

@NgModule({
  imports: [CommonModule],
  exports: [FaqAssistantComponent],
  declarations: [FaqAssistantComponent]
})
export class FaqModule {
}
