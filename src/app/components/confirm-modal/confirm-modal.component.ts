import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { Observable } from 'rxjs';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-confirm-modal',
  imports: [NgIf, CommonModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css',
})
export class ConfirmModalComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private modalService: ModalService
  ) {}

  isConfirmModalOpen$!: Observable<boolean>;
  deleteId$!: Observable<string | null>;

  ngOnInit(): void {
    this.isConfirmModalOpen$ = this.modalService.confirmModalState$;
    this.deleteId$ = this.modalService.deleteIdState$;
  }

  closeConfirmModal() {
    this.modalService.closeConfirmModal();
  }

  confirmDelete() {
    this.deleteId$.subscribe((id) => {
      if (id) {
        this.employeeService.deleteEmployee(id);
        this.closeConfirmModal();
      }
    });
  }
}
