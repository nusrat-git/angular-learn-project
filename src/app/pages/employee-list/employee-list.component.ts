import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../services/data/data.service';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form.component';

@Component({
  selector: 'app-employee-list',
  imports: [
    ReactiveFormsModule,
    NgFor,
    EmployeeFormComponent,
    // MyCustomPipe,
    // CustomAttributeDirective,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
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
