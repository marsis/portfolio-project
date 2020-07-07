
import {LoginRequest, SignUpRequest} from 'src/app/models/user.model';


export class Logout {
  static readonly type = '[App] Logout';
}

export class SignUp {
  static readonly type = '[App] Sign Up';

  constructor(public payload: SignUpRequest) { }
}

export class Login {
  static readonly type = '[App] Login';

  constructor(public payload: LoginRequest) { }
}
