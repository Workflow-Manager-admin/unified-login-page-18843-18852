import { Component } from '@angular/core';
import { BackgroundDecorComponent } from './background-decor/background-decor.component';
import { LoginPageComponent } from './login-page.component';
import { DashboardPageComponent } from './dashboard-page.component';

/**
 * PUBLIC_INTERFACE
 * App root. Wraps the background and renders main login or dashboard page.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BackgroundDecorComponent, LoginPageComponent, DashboardPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
