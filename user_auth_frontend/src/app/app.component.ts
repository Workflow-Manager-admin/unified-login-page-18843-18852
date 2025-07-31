import { Component } from '@angular/core';
import { BackgroundDecorComponent } from './background-decor/background-decor.component';
import { LoginPageComponent } from './login-page.component';

/**
 * PUBLIC_INTERFACE
 * App root. Wraps the background and renders main login page.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BackgroundDecorComponent, LoginPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
