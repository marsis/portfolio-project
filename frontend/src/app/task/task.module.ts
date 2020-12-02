import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreMaterialModule } from 'src/app/core/core-material.module';
import { TaskRoutingModule } from 'src/app/task/task-routing.module';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';


@NgModule({
  declarations: [
    TaskListComponent,
    TaskComponent,
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    CoreMaterialModule,
    DragDropModule,
    ReactiveFormsModule
  ]
})
export class TaskModule { }
