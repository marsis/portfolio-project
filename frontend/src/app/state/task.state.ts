import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {tap} from 'rxjs/operators';
import {Task} from 'src/app/models/task.model';
import {TaskService} from 'src/app/services/task.service';
import {AddTask, DeleteTask, GetTasks, ResetTasks, UpdateTask} from 'src/app/state/task.actions';


export class TaskStateModel {
  tasksList: Task[] = [];

}

@State<TaskStateModel>({
  name: 'tasks',
  defaults: new TaskStateModel()
})
export class TaskState {
  constructor(
    private store: Store,
    private taskService: TaskService
  ) {
  }

  @Selector()
  static tasks(state: TaskStateModel): Task[] {
    return state.tasksList;
  }

  @Action(GetTasks)
  getTasks(ctx: StateContext<TaskStateModel>) {
    return this.taskService.getTasks().pipe(
      tap((tasksList: Task[]) => {
        ctx.patchState({
          tasksList
        });
      })
    );
  }

  @Action(AddTask)
  addTask(ctx: StateContext<TaskStateModel>, { task }: AddTask) {
    return this.taskService.addTask(task).pipe(
      tap((task: Task) => {
        const tasksList = ctx.getState().tasksList
        ctx.patchState({
          tasksList: [...tasksList, task]
        });
      })
    );
  }

  @Action(UpdateTask)
  updateTask(ctx: StateContext<TaskStateModel>, {task}: UpdateTask) {
    return this.taskService.updateTask(task).pipe(
      tap((task: Task) => {
        const tasksList = ctx.getState().tasksList
        const index = tasksList.findIndex(el => el._id === task._id)
        tasksList[index] = task
        ctx.patchState({
          tasksList: [...tasksList]
        });
      })
    );
  }

  @Action(DeleteTask)
  deleteTask(ctx: StateContext<TaskStateModel>, { id }: DeleteTask ) {
    return this.taskService.deleteTask(id).pipe(
      tap(() => {
        let tasksList = [...ctx.getState().tasksList]
        tasksList = tasksList.filter(el => el._id !== id)

        ctx.patchState({
          tasksList: [...tasksList]
        });
      })
    );
  }

  @Action(ResetTasks)
  resetTasks(ctx: StateContext<TaskStateModel>) {
    ctx.setState(new TaskStateModel())
  }
}
