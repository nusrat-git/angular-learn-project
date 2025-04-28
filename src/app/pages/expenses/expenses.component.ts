import { Component, OnInit } from '@angular/core';
import { ExpenseFormComponent } from '../../components/expense-form/expense-form.component';
import { DataService } from '../../services/data/data.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-expenses',
  imports: [ExpenseFormComponent, NgFor],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
})
export class ExpensesComponent implements OnInit {
  expenses: any = [];

  selectedExpense: any = null;

  constructor(private dataService: DataService) {}

  fetchExpenses() {
    this.dataService.getExpenses().subscribe({
      next: (expenses) => {
        this.expenses = expenses;
      },
      error: (err) => {
        console.error('Failed to fetch expenses:', err);
      },
    });
  }

  ngOnInit(): void {
    this.fetchExpenses();
  }

  onExpenseSubmit(data: any) {
    if (data) {
      this.fetchExpenses();
    }
  }

  onEditExpense(expense: any) {
    this.selectedExpense = expense;
  }

  onDeleteExpense(id: string) {
    this.dataService.deleteExpense(id).subscribe({
      next: (response) => {
        this.fetchExpenses();
      },
      error: (err) => {
        console.error(err.message);
      },
    });
  }
}
