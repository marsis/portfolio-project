import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, SignUpRequest, User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(user: SignUpRequest) {
    return this.http.post('/users', user);
  }

  login(user: LoginRequest) {
    return this.http.post('/login', user);
  }

  logout(user: User) {
    return this.http.post('/logout', user);
  }

  getBackground(): Observable<any> {
    return this.http.get('/background');
  }
}
