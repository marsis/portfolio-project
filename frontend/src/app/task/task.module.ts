import {DragDropModule} from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';

import { TaskRoutingModule } from 'src/app/task/task-routing.module';
import {TodoComponent} from 'src/app/todo/todo.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';



@NgModule({
  declarations: [TaskListComponent,
    TaskComponent,
    TodoComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MatListModule,
    MatButtonModule,
    DragDropModule
  ]
})
export class TaskModule { }
