import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Employee,
  EmployeeService,
} from '../../services/employee/employee.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-employee-card',
  imports: [NgFor],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css',
})
export class EmployeeCardComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  employee: Employee | undefined;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.employeeService.getEmployeeById(id).subscribe((emp) => {
        this.employee = emp;
      });
    }
  }
}
