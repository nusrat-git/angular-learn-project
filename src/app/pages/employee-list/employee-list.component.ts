import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../services/data/data.service';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form.component';
import {
  Employee,
  EmployeeService,
} from '../../services/employee/employee.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  imports: [
    ReactiveFormsModule,
    NgFor,
    EmployeeFormComponent,
    CommonModule,
    // MyCustomPipe,
    // CustomAttributeDirective,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {}

  employees$!: Observable<Employee[]>;

  ngOnInit(): void {
    this.employees$ = this.employeeService.employees$;
  }

  onEditEmployee(employee: any) {
    this.employeeService.setEditEmployee(employee);
  }

  onDeleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id);
  }
}
