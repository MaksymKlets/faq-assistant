import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqAssistantComponent } from './faq-assistant.component';

describe('FaqAssistantComponent', () => {
  let component: FaqAssistantComponent;
  let fixture: ComponentFixture<FaqAssistantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqAssistantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
