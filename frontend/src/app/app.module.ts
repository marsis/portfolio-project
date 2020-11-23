import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreMaterialModule } from 'src/app/core/core-material.module';
import { CoreModule } from 'src/app/core/core.module';
import { ApiInterceptor } from 'src/app/core/interceptors/api.interceptor';
import { JwtInterceptor } from 'src/app/core/interceptors/jwt.interceptor';
import { RegistrationComponent } from 'src/app/registration/registration.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    CoreMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
  ],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
