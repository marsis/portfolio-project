import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Navigate} from '@ngxs/router-plugin';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {ColorsPalette} from 'src/app/models/colorsPalette.model';
import {UserService} from 'src/app/services/user.service';
import {SignUp} from 'src/app/state/auth.actions';
import {ColorPaletteState} from 'src/app/state/palette.state';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @Select(ColorPaletteState.palette) buttonColor$: Observable<ColorsPalette>;

  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private store: Store,
              private userService: UserService) {
  }

  registration() {
    if (this.registrationForm.invalid) {
      return;
    }
    this.store.dispatch(new SignUp(this.registrationForm.value)).subscribe(() => {
      this.store.dispatch(new Navigate(['home']));
    });
  }

  ngOnInit() {

    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

}
