import { Task } from 'src/app/models/task.model';


export class GetTasks {
  static readonly type = '[Task] Get tasks';

}

export class AddTask {
  static readonly type = '[Task] Add task';

  constructor(public task: Task) { }
}

export class UpdateTask {
  static readonly type = '[Task] Update task';

  constructor(public task: Task) { }
}

export class DeleteTask {
  static readonly type = '[Task] Delete task';

  constructor(public id: string) { }
}
