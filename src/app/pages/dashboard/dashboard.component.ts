import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from '../employee-list/employee-list.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, EmployeeListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor() {}
}
