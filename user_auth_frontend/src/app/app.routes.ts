import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page.component';
import { DashboardPageComponent } from './dashboard-page.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent, pathMatch: 'full', title: 'Login' },
  { path: 'login', component: LoginPageComponent, title: 'Login' },
  { path: 'dashboard', component: DashboardPageComponent, title: 'Dashboard' },
  { path: '**', redirectTo: '' }
];
