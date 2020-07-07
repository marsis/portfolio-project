import { Action, NgxsOnInit, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { SignUpRequest, User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Login, Logout, SignUp } from 'src/app/state/auth.actions';


export class UserStateModel {
  loggedIn = false;
  token: string;
  user: User;
  }

@State<UserStateModel>({
  name: 'auth',
  defaults: new UserStateModel()
})
export class UserState implements NgxsOnInit {
  constructor(
    private store: Store,
    private userService: UserService
  ) {}

  @Selector()
  static isLoggedIn(state: UserStateModel): boolean {
    return state.loggedIn;
  }

  @Selector()
  static user(state: UserStateModel): User {
    return state.user;
  }

  @Selector()
  static token(state: UserStateModel): string {
    return state.token;
  }

  ngxsOnInit(ctx?: StateContext<any>) {
    let user = JSON.parse(localStorage.getItem('chrome-ext'));
    user = user ? user : null;

    if (user) {
      ctx.patchState({
        loggedIn: !!user,
        token: user.token,
        user: user.user
      });
    }
  }

  @Action(SignUp)
  signUp(ctx: StateContext<UserStateModel>, {payload}: SignUp) {
    return this.userService.addUser(payload).pipe(
      tap((signUpResponse: any) => {
        localStorage.setItem('chrome-ext', JSON.stringify(signUpResponse));
        ctx.patchState({
          loggedIn: true,
          token: signUpResponse.token,
          user: signUpResponse.user
        });
      })
    );
  }

  @Action(Login)
  login(ctx: StateContext<UserStateModel>, { payload }: Login) {
    return this.userService.login(payload).pipe(
      tap((signInResponse: any) => {

        localStorage.setItem('chrome-ext', JSON.stringify(signInResponse));
        ctx.patchState({
          loggedIn: true,
          token: signInResponse.token,
          user: signInResponse.user
        });

      }),
     // catchError((error) => ctx.dispatch(new LoginFailed(error)))
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<UserStateModel>) {
    const token = this.store.snapshot().token;
    return this.userService.logout(token).pipe(
      tap((user) => {
        localStorage.removeItem('chrome-ext');
        ctx.patchState({
          loggedIn: false,
          token: null,
          user: null
        });
      })
    );
  }
}
