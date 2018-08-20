import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FaqAssistantButtonComponent} from './faq-assistant-button.component';

describe('FaqAssistantButtonComponent', () => {
  let component: FaqAssistantButtonComponent;
  let fixture: ComponentFixture<FaqAssistantButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FaqAssistantButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqAssistantButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
