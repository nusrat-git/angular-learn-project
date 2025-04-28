import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface Task {
  id: number;
  title: string;
  status: 'pending' | 'completed';
}

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  constructor(private http: HttpClient) {
    this.fetchTasks(); // Fetch tasks when the service is initialized
  }

  private apiUrl = 'http://localhost:3000/tasks';

  // private _isAuthenticated = new BehaviorSubject<boolean>(false);

  private _tasksSubject = new BehaviorSubject<Task[]>([]); // BehaviorSubject to track tasks
  tasks$ = this._tasksSubject.asObservable();

  fetchTasks(): void {
    this.http
      .get<Task[]>(this.apiUrl)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching tasks:', error);
          return throwError(() => new Error('Error fetching tasks'));
        })
      )
      .subscribe((tasks: any) => this._tasksSubject.next(tasks));
  }

  addTask(title: string): void {
    const newTask = { title, status: 'pending' } as Task;
    this.http.post<Task>(this.apiUrl, newTask).subscribe((task) => {
      this.fetchTasks();
    });
  }

  updateTaskStatus(taskId: number, newStatus: 'pending' | 'completed'): void {
    this.http
      .patch<Task>(`${this.apiUrl}/${taskId}`, { status: newStatus })
      .subscribe(() => {
        this.fetchTasks();
      });
  }

  deleteTask(taskId: number): void {
    this.http.delete(`${this.apiUrl}/${taskId}`).subscribe(() => {
      this.fetchTasks();
    });
  }

  // filterTasks(status: 'pending' | 'completed' | 'all'): void {
  //   if (status === 'all') {
  //     this.fetchTasks();
  //   } else {
  //     this.http
  //       .get<Task[]>(`${this.apiUrl}?status=${status}`)
  //       .subscribe((tasks) => {
  //         this._tasksSubject.next(tasks); // Update the task list
  //       });
  //   }
  // }
}
