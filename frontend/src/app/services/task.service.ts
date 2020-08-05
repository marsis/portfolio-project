import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get('/tasks');
  }

  getTaskById(id: string) {
    return this.http.get(`/tasks/${id}`);
  }

  addTask(task: Task) {
    return this.http.post('/tasks', task);
  }

  updateTask(task: Task) {
    return this.http.patch(`/tasks/${task._id}`, task);
  }

  deleteTask(id: string) {
    return this.http.delete(`/tasks/${id}`);
  }

  changeTaskOrder(tasks: Task[]) {
    return this.http.put(`/tasks/change-order`, tasks);
  }
}
