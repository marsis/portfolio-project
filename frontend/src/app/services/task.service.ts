import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Task} from 'src/app/models/task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get('http://127.0.0.1:3000/tasks');
  }

  getTaskById(id: string) {
    return this.http.get(`http://127.0.0.1:3000/tasks/${id}`);
  }

  addTask(task: Task) {
    return this.http.post('http://127.0.0.1:3000/tasks', task);
  }

  updateTask(task: Task) {
    return this.http.patch(`http://127.0.0.1:3000/tasks/${task._id}`, task);
  }

  deleteTask(id) {
    return this.http.delete(`http://127.0.0.1:3000/tasks/${id}`);
  }
}
