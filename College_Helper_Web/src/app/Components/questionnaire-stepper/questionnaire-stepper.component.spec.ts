import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireStepperComponent } from './questionnaire-stepper.component';

describe('QuestionnaireStepperComponent', () => {
  let component: QuestionnaireStepperComponent;
  let fixture: ComponentFixture<QuestionnaireStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionnaireStepperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionnaireStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
