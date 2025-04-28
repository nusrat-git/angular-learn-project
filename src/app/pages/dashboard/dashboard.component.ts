import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { NgFor, NgIf } from '@angular/common';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form.component';

@Component({
  selector: 'app-dashboard',
  imports: [NgFor, EmployeeFormComponent, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  editMode = false;
  employees: any = [];

  selectedEmployee: any = null;

  constructor(private dataService: DataService) {}

  fetchEmployees() {
    this.dataService.getData().subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: (err) => {
        console.error('Failed to fetch employees:', err);
      },
    });
  }
  modalOpen: boolean = false;

  openModal() {
    this.modalOpen = !this.modalOpen;
  }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  onEmployeeSubmit(data: any) {
    if (data) {
      this.fetchEmployees();
    }
  }

  onEditEmployee(employee: any) {
    this.editMode = true;
    this.selectedEmployee = employee;
    this.openModal();
  }

  onDeleteEmployee(id: string) {
    this.dataService.deleteEmployee(id).subscribe({
      next: (response) => {
        this.fetchEmployees();
      },
      error: (err) => {
        console.error(err.message);
      },
    });
  }
}
