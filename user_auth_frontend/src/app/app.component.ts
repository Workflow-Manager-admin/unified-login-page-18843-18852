import { Component } from '@angular/core';
import { BackgroundDecorComponent } from './background-decor/background-decor.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

/**
 * PUBLIC_INTERFACE
 * App root. Wraps the background and renders routed page views.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BackgroundDecorComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
