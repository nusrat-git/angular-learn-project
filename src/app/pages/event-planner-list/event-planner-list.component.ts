import { Component, OnInit } from '@angular/core';
import { EventPlannerFormComponent } from '../../components/event-planner-form/event-planner-form.component';
import { NgFor, NgIf } from '@angular/common';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-event-planner-list',
  imports: [EventPlannerFormComponent, NgFor],
  templateUrl: './event-planner-list.component.html',
  styleUrl: './event-planner-list.component.css',
})
export class EventPlannerListComponent implements OnInit {
  events: any = [];
  selectedEvent: any = null;

  constructor(private dataService: DataService) {}

  fetchEvents() {
    this.dataService.getEvents().subscribe({
      next: (events) => {
        this.events = events;
      },
      error: (err) => {
        console.error('Failed to fetch events:', err);
      },
    });
  }

  ngOnInit(): void {
    this.fetchEvents();
  }

  onEventSubmit(data: any) {
    if (data) {
      this.fetchEvents();
    }
  }

  onEditEvent(event: any) {
    this.selectedEvent = event;
  }

  onDeleteEvent(id: string) {
    this.dataService.deleteEvent(id).subscribe({
      next: (response) => {
        this.fetchEvents();
      },
      error: (err) => {
        console.error(err.message);
      },
    });
  }
}
