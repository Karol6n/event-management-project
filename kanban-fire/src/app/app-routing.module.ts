import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LandingComponent } from './modules/landing/landing.component';
import { LoginComponent } from './modules/login/pages/login-page.component';
import { RegisterComponent } from './modules/register/pages/register-page.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { ProfileComponent } from './modules/profile/pages/profile.component';
import { ForgotPasswordComponent } from './modules/forgot-password/pages/forgot-password-page.component';
import { ResetPasswordComponent } from './modules/reset-password/pages/reset-password-page.component';
import { EventsListComponent } from './modules/events/pages/events-list-page/events-list-page.component';
import { EventsAddComponent } from './modules/events/pages/events-add-page/events-add-page.component';
import { EventsDetailViewComponent } from './modules/events/pages/events-details-view-page/events-details-view-page.component';
import { ContactComponent } from './modules/contact/pages/contact-page.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent,
    ...canActivate(redirectLoggedInToDashboard),
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToDashboard),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'register',
    component: RegisterComponent,
    ...canActivate(redirectLoggedInToDashboard),
  },
  {
    path: 'profile',
    component: ProfileComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    ...canActivate(redirectLoggedInToDashboard),
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    ...canActivate(redirectLoggedInToDashboard),
  },
  {
    path: 'events',
    component: EventsListComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'events/add',
    component: EventsAddComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'events/:id',
    component: EventsDetailViewComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'contact',
    component: ContactComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
