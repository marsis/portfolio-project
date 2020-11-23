import {formatDate} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {Navigate} from '@ngxs/router-plugin';
import {Select, Store} from '@ngxs/store';
import {interval, Observable, Subscription} from 'rxjs';
import {map, mergeMap, startWith} from 'rxjs/operators';
import {ColorsPalette} from 'src/app/models/colorsPalette.model';
import {User} from 'src/app/models/user.model';
import {Logout} from 'src/app/state/auth.actions';
import {UserState} from 'src/app/state/auth.state';
import {GetColorPalette} from 'src/app/state/palette.actions';
import {ColorPaletteState} from 'src/app/state/palette.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @Select(UserState.isLoggedIn) isLoggedIn$: Observable<boolean>;
  @Select(UserState.user) user$: Observable<User>;
 // @Select(ColorPaletteState.palette) titleText$: Observable<ColorsPalette>;

  imgUrl: SafeResourceUrl;
  title = 'dist1';
  user: User;
  isLoggedIn = false;
  textColor: ColorsPalette;


  private subscription = new Subscription();

  constructor(
              private router: Router,
              private store: Store,
              private domSanitizer: DomSanitizer) {

  }

  currentTime = interval(3000).pipe(
    startWith(0), // here we can start from any value because all we need is to emit first value from the start
    map(() => formatDate(Date.now(), 'EEEE, dd.MM.yyyy | HH:mm', 'en-US'))
  );

  ngOnInit(): void {
    this.store.dispatch(new GetColorPalette());
    this.subscription.add(
    this.store.select(ColorPaletteState.backgroundUrl).subscribe((url) => {
      this.imgUrl = this.domSanitizer.bypassSecurityTrustStyle(`url(${url}) no-repeat`);
    }));
    this.subscription.add(
    this.store.select(ColorPaletteState.palette).subscribe(palette => this.textColor = palette));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    const token = this.store.selectSnapshot(UserState.token);
    this.store.dispatch(new Logout()).subscribe(() => {
      this.store.dispatch(new Navigate(['']));
    });
  }

}
