import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
  skills: string[];
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {
    this.fetchEmployees();
  }

  private apiUrl = 'http://localhost:3000/employees';

  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  employees$ = this.employeesSubject.asObservable();

  editEmployeeSubject = new BehaviorSubject<Employee | null>(null);
  editEmployee$ = this.editEmployeeSubject.asObservable();

  setEditEmployee(employee: Employee | null) {
    this.editEmployeeSubject.next(employee);
  }

  fetchEmployees(): void {
    this.http
      .get<Employee[]>(this.apiUrl)
      .pipe(
        catchError((error) => {
          console.error('Error fetching employees:', error);
          return throwError(() => new Error('Failed to fetch employees'));
        })
      )
      .subscribe((employees) => {
        this.employeesSubject.next(employees);
      });
  }

  addEmployee(employee: Employee): void {
    this.http
      .post<Employee>(this.apiUrl, employee)
      .pipe(
        catchError((error) => {
          console.error('Error adding employee:', error);
          return throwError(() => new Error('Failed to add employee'));
        })
      )
      .subscribe((newEmployee) => {
        const updatedEmployees = [...this.employeesSubject.value, newEmployee];
        this.employeesSubject.next(updatedEmployees);
      });
  }

  updateEmployee(id: string, employee: Partial<Employee>): void {
    this.http
      .patch<Employee>(`${this.apiUrl}/${id}`, employee)
      .pipe(
        catchError((error) => {
          console.error('Error updating employee:', error);
          return throwError(() => new Error('Failed to update employee'));
        })
      )
      .subscribe((updatedEmployee) => {
        const updatedEmployees = this.employeesSubject.value.map((emp) =>
          emp.id === id ? { ...emp, ...updatedEmployee } : emp
        );
        this.employeesSubject.next(updatedEmployees);
        this.setEditEmployee(null);
      });
  }

  deleteEmployee(id: string): void {
    this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error deleting employee:', error);
          return throwError(() => new Error('Failed to delete employee'));
        })
      )
      .subscribe(() => {
        const updatedEmployees = this.employeesSubject.value.filter(
          (emp) => emp.id !== id
        );
        this.employeesSubject.next(updatedEmployees);
      });
  }
}
