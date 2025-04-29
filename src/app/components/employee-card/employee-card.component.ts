import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Employee,
  EmployeeService,
} from '../../services/employee/employee.service';
import { NgFor } from '@angular/common';
import { ModalService } from '../../services/modal/modal.service';
import { Observable } from 'rxjs';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-employee-card',
  imports: [NgFor, EmployeeFormComponent],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css',
})
export class EmployeeCardComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private modalService: ModalService
  ) {}

  employee: Employee | undefined;
  isModalOpen$!: Observable<boolean>;

  ngOnInit() {
    this.isModalOpen$ = this.modalService.modalState$;

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.employeeService.getEmployeeById(id).subscribe((emp) => {
        this.employee = emp;
      });
    }
  }

  goBack() {
    this.router.navigate(['/employees']);
  }

  openModal() {
    this.modalService.openModal();
  }

  onEditEmployee(employee: any) {
    this.employeeService.setEditEmployee(employee);
    this.openModal();
  }
}
