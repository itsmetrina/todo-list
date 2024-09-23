import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task } from './modal/todo.interface';
import { TodoTaskComponent } from './todo-task/todo-task.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, TodoTaskComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	title = 'todo-list';
	tasks: Task[] = [];

	onTaskAdd = (task: string) => {
		this.tasks.push({ title: task, completed: false });
	}

	onTaskDelete = (taskIdx: number) => {
		this.tasks.splice(taskIdx, 1);
	}

	// onTaskCompletion = (taskIdx: number) => {
	// 	this.tasks[taskIdx].completed = !this.tasks[taskIdx].completed;
	// }
}
