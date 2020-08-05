import {DragDropModule} from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
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
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class TaskModule { }
