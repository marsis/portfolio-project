import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from 'src/app/core/auth/auth.guard';
import {LoginComponent} from 'src/app/login/login.component';
import {RegistrationComponent} from 'src/app/registration/registration.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: RegistrationComponent
  },
  {
    canActivate: [AuthGuard],
    path: '',
    loadChildren:  () => import('src/app/home/home.module').then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
