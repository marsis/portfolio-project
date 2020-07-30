import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import {AddTask, GetTasks} from 'src/app/state/task.actions';
import { TaskState } from 'src/app/state/task.state';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Select(TaskState.tasks) tasksList$: Observable<Task[]>;


  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetTasks())
  }

  addTask() {
    this.store.dispatch(new AddTask({description: 'New Task', completed: false}))
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
