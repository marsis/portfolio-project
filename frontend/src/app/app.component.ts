import {Component, OnDestroy, OnInit} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import {User} from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import {Logout} from 'src/app/state/auth.actions';
import { UserState } from 'src/app/state/auth.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  imgUrl: SafeResourceUrl;
  title = 'dist1';

  user: User;
  isLoggedIn = false;

  private subscription = new Subscription();
 // @Select(UserState.isLoggedIn) isLoggedIn$: Observable<boolean>;
 // @Select(UserState.user) user$: Observable<User>;

  constructor(private userService: UserService,
              private router: Router,
              private store: Store,
              private domSanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.subscription.add(
    this.userService.getFoto().subscribe(foto => {
      this.imgUrl = this.domSanitizer.bypassSecurityTrustStyle(`url(${foto.body}) no-repeat`);
    }));

    this.subscription.add(
      this.store.select(UserState.isLoggedIn).subscribe(isloggedIn => this.isLoggedIn = isloggedIn));
    this.subscription.add(
    this.store.select(UserState.user).subscribe(user => this.user = user));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    const token = this.store.selectSnapshot(UserState.token);
    this.store.dispatch(new Logout());
  }

}
