import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-todo-task',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './todo-task.component.html',
	styleUrl: './todo-task.component.css'
})
export class TodoTaskComponent {
	newtask: string = '';

	@Output() taskAdded = new EventEmitter<string>();

	addTask = () => {
		if (this.newtask.trim()) {
			this.taskAdded.emit(this.newtask);
			this.newtask = '';
		} else {
			alert("Please type a task to add in your list.")
		}
	}
}