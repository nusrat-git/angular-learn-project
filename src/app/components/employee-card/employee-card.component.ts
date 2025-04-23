import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-employee-card',
  imports: [],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css',
})
export class EmployeeCardComponent {
  @Input() employee: any;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.employee.id);
  }

  onDelete() {
    this.delete.emit(this.employee.id);
  }
}
