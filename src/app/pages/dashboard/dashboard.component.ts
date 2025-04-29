import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import {
  Employee,
  EmployeeService,
} from '../../services/employee/employee.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, EmployeeListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private employeeService: EmployeeService) {}

  employees$!: Observable<Employee[]>;
  thisMonthEmployees: any = [];
  departments: any = [];

  ngOnInit(): void {
    this.employees$ = this.employeeService.employees$;

    this.thisMonthEmployees = this.employees$.subscribe((employees) => {
      const now = new Date();
      const currentMonth = now.getMonth(); // April = 3
      const currentYear = now.getFullYear();

      const employeeDepartments = employees.map((emp) => emp.department);
      this.departments = Array.from(new Set(employeeDepartments));

      this.thisMonthEmployees = employees.filter((emp) => {
        if (!emp.created) return false;

        const createdDate = new Date(emp.created);
        return (
          createdDate.getMonth() === currentMonth &&
          createdDate.getFullYear() === currentYear
        );
      });
    });
  }
}
