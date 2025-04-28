import { Component } from '@angular/core';
import { TaskServiceService } from '../../services/task-service/task-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-creator',
  imports: [FormsModule],
  templateUrl: './task-creator.component.html',
  styleUrl: './task-creator.component.css',
})
export class TaskCreatorComponent {
  taskTitle = '';

  constructor(private taskService: TaskServiceService) {}

  addTask(): void {
    if (this.taskTitle.trim()) {
      this.taskService.addTask(this.taskTitle);
      this.taskTitle = '';
    }
  }
}
