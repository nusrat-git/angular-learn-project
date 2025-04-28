import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { CommonModule, NgFor } from '@angular/common';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form.component';
import {
  Employee,
  EmployeeService,
} from '../../services/employee/employee.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [NgFor, EmployeeFormComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
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
