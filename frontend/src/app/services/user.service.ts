import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {LoginRequest, SignUpRequest} from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(user: SignUpRequest) {
    return this.http.post('http://127.0.0.1:3000/users', user);
  }

  login(user: LoginRequest) {
    return this.http.post('http://127.0.0.1:3000/login', user);
  }

  logout(user) {
    return this.http.post('http://127.0.0.1:3000/logout', user);
  }

  getFoto(): Observable<any> {
    return this.http.get('http://127.0.0.1:3000/photos');
  }
}
