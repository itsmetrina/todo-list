import { Component, OnInit } from '@angular/core';

import { TodoTaskComponent } from "../todo-task/todo-task.component";
import { SignupService } from '../service/signup/signup.service';

import { SignupFormData } from '../modal/signup.interface';
import { Task } from '../modal/todo.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-task-layout',
	standalone: true,
	imports: [TodoTaskComponent],
	templateUrl: './task-layout.component.html',
	styleUrl: './task-layout.component.css'
})
export class TaskLayoutComponent implements OnInit {
	tasks: Task[] = [];
	signupData!: SignupFormData | null;
	private unsubscribe = new Subject<void>();


	onTaskAdd = (task: string) => {
		this.tasks.push({ title: task, completed: false });
	}

	onTaskDelete = (taskIdx: number) => {
		this.tasks.splice(taskIdx, 1);
	}

	// onTaskCompletion = (taskIdx: number) => {
	// 	this.tasks[taskIdx].completed = !this.tasks[taskIdx].completed;
	// }

	constructor(private signupservice: SignupService) { }

	ngOnInit(): void {
		this.signupservice.signupData$.pipe(takeUntil(this.unsubscribe)).subscribe((data: SignupFormData | null) => {

			this.signupData = data;
		});
	}
}