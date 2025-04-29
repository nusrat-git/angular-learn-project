import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {}

  private modalStateSubject = new BehaviorSubject<boolean>(false);
  modalState$ = this.modalStateSubject.asObservable();

  private confirmModalStateSubject = new BehaviorSubject<boolean>(false);
  confirmModalState$ = this.confirmModalStateSubject.asObservable();

  private deleteIdStateSubject = new BehaviorSubject<string | null>(null);
  deleteIdState$ = this.deleteIdStateSubject.asObservable();

  openModal(): void {
    this.modalStateSubject.next(true);
  }

  closeModal(): void {
    this.modalStateSubject.next(false);
  }

  openConfirmModal(id: string): void {
    this.deleteIdStateSubject.next(id);
    this.confirmModalStateSubject.next(true);
  }

  closeConfirmModal(): void {
    this.deleteIdStateSubject.next(null);
    this.confirmModalStateSubject.next(false);
  }
}
