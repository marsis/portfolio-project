import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NGXS_PLUGINS, NgxsModule} from '@ngxs/store';
import { JwtInterceptor } from 'src/app/interceptors/jwt.interceptor';
import { RegistrationComponent } from 'src/app/registration/registration.component';
import {Logout} from 'src/app/state/auth.actions';
import { UserState } from 'src/app/state/auth.state';
import { ColorPaletteState } from 'src/app/state/palette.state';
import { TaskState } from 'src/app/state/task.state';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login/login.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { PushNotificationComponent } from './push-notification/push-notification.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    PushNotificationComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([
      UserState,
      ColorPaletteState,
      TaskState
    ], {developmentMode: !environment.production}),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    DragDropModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
