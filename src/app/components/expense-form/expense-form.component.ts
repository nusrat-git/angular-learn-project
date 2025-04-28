import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-expense-form',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css',
})
export class ExpenseFormComponent implements OnInit {
  expenseForm: FormGroup;

  @Input() editExpense: any = null;
  @Output() submit = new EventEmitter<any>();

  addExpenseForm(): FormGroup {
    return this.fb.group({
      amount: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      expenseDate: ['', [Validators.required]],
    });
  }

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.expenseForm = this.addExpenseForm();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editExpense'] && this.editExpense) {
      this.expenseForm.patchValue(this.editExpense);
    }
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      if (this.editExpense) {
        this.dataService
          .updateExpense(this.editExpense.id, this.expenseForm.value)
          .subscribe((response) => {
            this.submit.emit(response);
          });
      } else {
        this.dataService
          .addExpense(this.expenseForm.value)
          .subscribe((response) => {
            this.submit.emit(response);
          });
      }
    }
    this.expenseForm.reset();
  }
}
