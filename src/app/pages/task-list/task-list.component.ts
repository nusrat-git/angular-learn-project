import { Component } from '@angular/core';
import { TaskCreatorComponent } from '../../components/task-creator/task-creator.component';
import { Observable } from 'rxjs';
import { TaskServiceService } from '../../services/task-service/task-service.service';
import { CommonModule, NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [TaskCreatorComponent, NgFor, NgClass, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  tasks$!: Observable<any[]>;

  constructor(private taskService: TaskServiceService) {}

  ngOnInit(): void {
    this.tasks$ = this.taskService.tasks$;
  }

  toggleTaskCompletion(taskId: number, event: any): void {
    const newStatus = event.target.checked ? 'completed' : 'pending';
    this.taskService.updateTaskStatus(taskId, newStatus);
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
  }
}
