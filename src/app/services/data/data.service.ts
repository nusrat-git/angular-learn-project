import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrlEmployee = 'http://localhost:3000/employees';
  private apiUrlExpense = 'http://localhost:3000/expenses';
  private apiUrlEvent = 'http://localhost:3000/events';
  private apiUrlApplication = 'http://localhost:3000/applications';

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

  // events
  getEvents(): Observable<any> {
    return this.http.get(this.apiUrlEvent).pipe(
      catchError((error) => {
        console.error('Fetch error:', error);
        return throwError(() => new Error('Failed to fetch events'));
      })
    );
  }

  getEvent(id: string): Observable<any> {
    return this.http.get(`${this.apiUrlEvent}/${id}`).pipe(
      catchError((error) => {
        if (error.status === 404) {
          return throwError(() => new Error('Event not found.'));
        } else {
          console.error('Fetch error:', error);
          return throwError(() => new Error('Failed to fetch event.'));
        }
      })
    );
  }

  addEvent(event: any): Observable<any> {
    return this.http.post(this.apiUrlEvent, event).pipe(
      catchError((error) => {
        console.error('Error adding Event:', error);
        return throwError(() => new Error('Failed to add Event.'));
      })
    );
  }

  updateEvent(id: string | null, event: any): Observable<any> {
    if (id === null || id === undefined) {
      return throwError(() => new Error('Invalid event ID.'));
    }

    return this.http.put(`${this.apiUrlEvent}/${id}`, event).pipe(
      catchError((error) => {
        console.error('Error updating event:', error);
        return throwError(() => new Error('Failed to update event.'));
      })
    );
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrlEvent}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting event:', error);
        return throwError(() => new Error('Failed to delete event.'));
      })
    );
  }

  // applications
  getApplications(): Observable<any> {
    return this.http.get(this.apiUrlApplication).pipe(
      catchError((error) => {
        console.error('Fetch error:', error);
        return throwError(() => new Error('Failed to fetch applications'));
      })
    );
  }

  getApplication(id: string): Observable<any> {
    return this.http.get(`${this.apiUrlApplication}/${id}`).pipe(
      catchError((error) => {
        if (error.status === 404) {
          return throwError(() => new Error('Application not found.'));
        } else {
          console.error('Fetch error:', error);
          return throwError(() => new Error('Failed to fetch application.'));
        }
      })
    );
  }

  addApplication(application: any): Observable<any> {
    return this.http.post(this.apiUrlApplication, application).pipe(
      catchError((error) => {
        console.error('Error adding application:', error);
        return throwError(() => new Error('Failed to add application.'));
      })
    );
  }

  updateApplication(id: string | null, application: any): Observable<any> {
    if (id === null || id === undefined) {
      return throwError(() => new Error('Invalid application ID.'));
    }

    return this.http.put(`${this.apiUrlApplication}/${id}`, application).pipe(
      catchError((error) => {
        console.error('Error updating application:', error);
        return throwError(() => new Error('Failed to update application.'));
      })
    );
  }

  deleteApplication(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrlApplication}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting application:', error);
        return throwError(() => new Error('Failed to delete application.'));
      })
    );
  }
}
