import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TodoTaskComponent } from './todo-task/todo-task.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;
	
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppComponent, TodoTaskComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the AppComponent', () => {
		expect(component).toBeTruthy();
	});

	it(`should have the 'todo-list' title`, () => {
		const app = fixture.componentInstance;
		expect(app.title).toEqual('todo-list');
	});

	it('should render title ToDo App', () => {
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.querySelector('h5')?.textContent).toContain('ToDo App');
	});

	it('should add a task when onTaskAdd is called', () => {
		const task = 'Dummy Task';
		component.onTaskAdd(task);
		expect(component.tasks.length).toBe(1);
		expect(component.tasks[0].title).toBe(task);
	});

	it('should delete a task when onTaskDelete is called', () => {
		const task = 'Dummy Task to delete';
		component.onTaskAdd(task);
		component.onTaskDelete(0);
		expect(component.tasks.length).toBe(0);
	});

	it('should tasks in the list', () => {
		const task1 = 'Dummy Task 1';
		const task2 = 'Dummy Task 2';
		component.onTaskAdd(task1);
		component.onTaskAdd(task2);
		fixture.detectChanges();

		const taskItems = fixture.debugElement.queryAll(By.css('.list-group-item'));
		expect(component.tasks.length).toBe(2);
		expect(taskItems[0].nativeElement.textContent).toContain(task1);
		expect(taskItems[1].nativeElement.textContent).toContain(task2);
	});
});