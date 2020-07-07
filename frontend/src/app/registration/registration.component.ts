import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngxs/store';
import {UserService} from 'src/app/services/user.service';
import {SignUp} from 'src/app/state/auth.actions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private store: Store,
              private userService: UserService) {
  }

  registration() {
    this.store.dispatch(new SignUp(this.registrationForm.value));
  }

  ngOnInit() {

    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

}
