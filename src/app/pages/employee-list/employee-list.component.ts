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
import { ModalService } from '../../services/modal/modal.service';

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
  constructor(
    private employeeService: EmployeeService,
    private modalService: ModalService
  ) {}

  employees$!: Observable<Employee[]>;
  isModalOpen$!: Observable<boolean>;

  ngOnInit(): void {
    this.employees$ = this.employeeService.employees$;

    //  this.modalService.modalState$.subscribe((state) => {
    // });
    this.isModalOpen$ = this.modalService.modalState$;

    // isModalOpen$: Observable<boolean> = this.modalService.modalState$;
  }

  openModal() {
    this.modalService.openModal();
  }

  onEditEmployee(employee: any) {
    this.employeeService.setEditEmployee(employee);
    this.openModal();
  }

  onDeleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id);
  }
}
