import { Component } from '@angular/core';
import { LogoGroupComponent } from './logo-group/logo-group.component';

@Component({
  selector: 'app-root',
  imports: [LogoGroupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'user_auth_frontend is being generated';
}
