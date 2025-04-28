import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlannerListComponent } from './event-planner-list.component';

describe('EventPlannerListComponent', () => {
  let component: EventPlannerListComponent;
  let fixture: ComponentFixture<EventPlannerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventPlannerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventPlannerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
