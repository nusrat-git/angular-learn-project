import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrlEmployee = 'http://localhost:3000/employees';
  private apiUrlExpense = 'http://localhost:3000/expenses';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.apiUrlEmployee).pipe(
      catchError((error) => {
        console.error('Fetch error:', error);
        return throwError(() => new Error('Failed to fetch employees'));
      })
    );
  }

  getEmployee(id: string): Observable<any> {
    return this.http.get(`${this.apiUrlEmployee}/${id}`).pipe(
      catchError((error) => {
        if (error.status === 404) {
          return throwError(() => new Error('Employee not found.'));
        } else {
          console.error('Fetch error:', error);
          return throwError(() => new Error('Failed to fetch employee.'));
        }
      })
    );
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post(this.apiUrlEmployee, employee).pipe(
      catchError((error) => {
        console.error('Error adding employee:', error);
        return throwError(() => new Error('Failed to add employee.'));
      })
    );
  }

  updateEmployee(id: string | null, employee: any): Observable<any> {
    if (id === null || id === undefined) {
      return throwError(() => new Error('Invalid employee ID.'));
    }

    return this.http.put(`${this.apiUrlEmployee}/${id}`, employee).pipe(
      catchError((error) => {
        console.error('Error updating employee:', error);
        return throwError(() => new Error('Failed to update employee.'));
      })
    );
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrlEmployee}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting employee:', error);
        return throwError(() => new Error('Failed to delete employee.'));
      })
    );
  }

  // expense

  getExpenses(): Observable<any> {
    return this.http.get(this.apiUrlExpense).pipe(
      catchError((error) => {
        console.error('Fetch error:', error);
        return throwError(() => new Error('Failed to fetch expenses'));
      })
    );
  }

  getExpense(id: string): Observable<any> {
    return this.http.get(`${this.apiUrlExpense}/${id}`).pipe(
      catchError((error) => {
        if (error.status === 404) {
          return throwError(() => new Error('expense not found.'));
        } else {
          console.error('Fetch error:', error);
          return throwError(() => new Error('Failed to fetch expense.'));
        }
      })
    );
  }

  addExpense(expense: any): Observable<any> {
    return this.http.post(this.apiUrlExpense, expense).pipe(
      catchError((error) => {
        console.error('Error adding expense:', error);
        return throwError(() => new Error('Failed to add expense.'));
      })
    );
  }

  updateExpense(id: string | null, expense: any): Observable<any> {
    if (id === null || id === undefined) {
      return throwError(() => new Error('Invalid expense ID.'));
    }

    return this.http.put(`${this.apiUrlExpense}/${id}`, expense).pipe(
      catchError((error) => {
        console.error('Error updating expense:', error);
        return throwError(() => new Error('Failed to update expense.'));
      })
    );
  }

  deleteExpense(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrlExpense}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting expense:', error);
        return throwError(() => new Error('Failed to delete expense.'));
      })
    );
  }
}
