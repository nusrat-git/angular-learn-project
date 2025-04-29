import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form.component';
import {
  Employee,
  EmployeeService,
} from '../../services/employee/employee.service';
import { Observable } from 'rxjs';
import { ModalService } from '../../services/modal/modal.service';
import { RouterLink } from '@angular/router';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-employee-list',
  imports: [
    ReactiveFormsModule,
    NgFor,
    EmployeeFormComponent,
    CommonModule,
    RouterLink,
    ConfirmModalComponent,
    // MyCustomPipe,
    // CustomAttributeDirective,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private modalService: ModalService
  ) {}

  employees$!: Observable<Employee[]>;
  isModalOpen$!: Observable<boolean>;

  ngOnInit(): void {
    this.employees$ = this.employeeService.employees$;

    this.isModalOpen$ = this.modalService.modalState$;
  }

  openModal() {
    this.modalService.openModal();
  }

  onEditEmployee(employee: any) {
    this.employeeService.setEditEmployee(employee);
    this.openModal();
  }

  onDeleteEmployee(id: string) {
    this.modalService.openConfirmModal(id);
  }
}
