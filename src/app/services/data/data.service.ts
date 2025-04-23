import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  // getData() {
  //   return this.http.get('http://localhost:3000/employees');
  // }

  // getData() {
  //   return this.http.get('http://localhost:3000/employees').pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('Error occurred:', error);
  //       return throwError(
  //         () => new Error('Something went wrong, please try again later.')
  //       );
  //     })
  //   );
  // }

  getData(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Fetch error:', error);
        return throwError(() => new Error('Failed to fetch employees'));
      })
    );
  }

  getEmployee(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
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

  // postData(data: any) {
  //   return this.http.post('http://localhost:3000/employees', data);
  // }

  // addEmployee(employee: any): Observable<any> {
  //   return this.http.post(this.apiUrl, employee);
  // }

  addEmployee(employee: any): Observable<any> {
    return this.http.post(this.apiUrl, employee).pipe(
      catchError((error) => {
        console.error('Error adding employee:', error);
        return throwError(() => new Error('Failed to add employee.'));
      })
    );
  }

  // updateEmployee(id: string | null, employee: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/${id}`, employee);
  // }

  updateEmployee(id: string | null, employee: any): Observable<any> {
    if (id === null || id === undefined) {
      return throwError(() => new Error('Invalid employee ID.'));
    }

    return this.http.put(`${this.apiUrl}/${id}`, employee).pipe(
      catchError((error) => {
        console.error('Error updating employee:', error);
        return throwError(() => new Error('Failed to update employee.'));
      })
    );
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting employee:', error);
        return throwError(() => new Error('Failed to delete employee.'));
      })
    );
  }

  // deleteEmployee(id: string): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/${id}`);
  // }
}
