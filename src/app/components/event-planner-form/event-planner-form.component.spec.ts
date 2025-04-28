import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlannerFormComponent } from './event-planner-form.component';

describe('EventPlannerFormComponent', () => {
  let component: EventPlannerFormComponent;
  let fixture: ComponentFixture<EventPlannerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventPlannerFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventPlannerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
