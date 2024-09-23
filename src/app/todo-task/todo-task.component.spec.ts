import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoTaskComponent } from './todo-task.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('TodoTaskComponent', () => {
	let component: TodoTaskComponent;
	let fixture: ComponentFixture<TodoTaskComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FormsModule, TodoTaskComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(TodoTaskComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the TodoTaskComponent', () => {
		expect(component).toBeTruthy();
	});

	it('should have an input and a button', () => {
		const inputElement = fixture.debugElement.query(By.css('input#task'));
		const buttonElement = fixture.debugElement.query(By.css('button#button-taskadd'));

		expect(inputElement).toBeTruthy(); // Check if input exists
		expect(buttonElement).toBeTruthy(); // Check if button exists
	});

	it('should emit taskAdded to AppComponent when addTask() is called with a valid task input', () => {
		spyOn(component.taskAdded, 'emit'); // Spy on the emit method

		component.newtask = 'Test task';
		component.addTask();

		expect(component.taskAdded.emit).toHaveBeenCalledWith('Test task');
		expect(component.newtask).toBe(''); // Check if newtask is reset
	});

	it('should bind input value to newtask and emit taskAdded to AppComponent on button click', () => {
		spyOn(component.taskAdded, 'emit');

		const inputElement = fixture.debugElement.query(By.css('input#task')).nativeElement;
		const buttonElement = fixture.debugElement.query(By.css('button#button-taskadd')).nativeElement;

		// Simulate typing into the input
		inputElement.value = 'Another task';
		inputElement.dispatchEvent(new Event('input'));
		fixture.detectChanges(); // Update the view

		// Simulate button click
		buttonElement.click();
		fixture.detectChanges(); // Update the view

		expect(component.taskAdded.emit).toHaveBeenCalledWith('Another task');
	});

	it('should not emit taskAdded to AppComponent when addTask() is called with an empty task input', () => {
		spyOn(component.taskAdded, 'emit');

		component.newtask = ''; // Set newtask to an empty string
		component.addTask();

		expect(component.taskAdded.emit).not.toHaveBeenCalled(); // Emit should not be called
		expect(component.newtask).toBe(''); // Check if newtask is still empty
	});

	it('should alert when addTask() is called with an empty task input', () => {
		spyOn(window, 'alert'); // Spy on the alert function

		component.newtask = ''; // Set newtask to an empty string
		component.addTask();

		expect(window.alert).toHaveBeenCalledWith("Please type a task to add in your list.");
	});
});