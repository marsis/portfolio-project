import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {ColorsPalette} from 'src/app/models/colorsPalette.model';
import {TaskService} from 'src/app/services/task.service';
import {ColorPaletteState} from 'src/app/state/palette.state';

import {AddTask, DeleteTask, GetTasks} from 'src/app/state/task.actions';
import { TaskState } from 'src/app/state/task.state';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @ViewChild('formDirective', {static: true}) private formDirective: NgForm;

  taskForm: FormGroup;
  textColor: ColorsPalette;
  tasks: Task[] = [];

  constructor(private store: Store,
              private formBuilder: FormBuilder,
              private taskService: TaskService) { }

  ngOnInit() {
    this.store.select(ColorPaletteState.palette).subscribe(palette => this.textColor = palette);
    this.taskForm = this.formBuilder.group({
      description: ['', Validators.required]
    });
    this.store.dispatch(new GetTasks()).pipe(
      switchMap(() => this.store.select(TaskState.tasks)),
      tap((tasks) => this.tasks = [...tasks])
    ).subscribe();
  }

  addTask() {
    this.store.dispatch(new AddTask({description: this.taskForm.value.description, completed: false})).subscribe(
      () => {
        this.formDirective.resetForm();
        this.taskForm.reset();

      },
      (e) => console.log(e)
    );
  }

  deleteTask(item: Task) {
    this.store.dispatch(new DeleteTask(item._id));
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.taskService.changeTaskOrder(this.tasks).subscribe((data => console.log(data)));
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
