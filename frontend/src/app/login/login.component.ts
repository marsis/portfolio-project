import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Navigate} from '@ngxs/router-plugin';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {ColorsPalette} from 'src/app/models/colorsPalette.model';
import {UserService} from 'src/app/services/user.service';
import {Login} from 'src/app/state/auth.actions';
import {ColorPaletteState} from 'src/app/state/palette.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Select(ColorPaletteState.palette) buttonColor$: Observable<ColorsPalette>;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private store: Store) {
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.store.dispatch(new Login(this.loginForm.value)).subscribe(() => {
      this.store.dispatch(new Navigate(['home']));
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['123@gmail.com', [Validators.required, Validators.email]],
      password: ['123', [Validators.required]]
    });
  }
}
