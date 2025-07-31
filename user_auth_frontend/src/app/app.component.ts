import { Component } from '@angular/core';
import { LogoGroupComponent } from './logo-group/logo-group.component';
import { BackgroundDecorComponent } from './background-decor/background-decor.component';

/**
 * PUBLIC_INTERFACE
 * App root, includes the reusable background decor component.
 */
@Component({
  selector: 'app-root',
  imports: [LogoGroupComponent, BackgroundDecorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'user_auth_frontend is being generated';
}
