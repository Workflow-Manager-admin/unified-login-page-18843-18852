import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  imports: [NgIf, NgClass],
})
/**
 * PUBLIC_INTERFACE
 * @summary Minimal modern button based on Figma tokens and dashboard-login.css
 * @description
 * Reusable button supporting color, text, optional icon, and click event.
 * Colors: 'primary' | 'accent' | 'secondary', matches Figma design system
 * Usage:
 * <app-button color="primary" text="Login" (clicked)="onLogin()" icon="login-icon"></app-button>
 */
export class ButtonComponent {
  /** The button text */
  @Input() text: string = '';

  /** Color theme: 'primary' (default), 'accent', 'secondary' */
  @Input() color: 'primary' | 'accent' | 'secondary' = 'primary';

  /** Optional icon CSS class (background icon - e.g. 'login-icon', 'user-icon') */
  @Input() icon?: string;

  /** Output event emitted when user clicks the button */
  @Output() clicked = new EventEmitter<Event>();

  /** Handle button click event */
  // PUBLIC_INTERFACE
  handleClick(event: Event) {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }

  /** If the button is disabled */
  @Input() disabled: boolean = false;

  // Button's computed class for color
  get btnClass(): string {
    // Uses Figma/dashbaord-login color tokens and can be expanded
    switch (this.color) {
      case 'accent':
        return 'btn-accent';
      case 'secondary':
        return 'btn-secondary';
      case 'primary':
      default:
        return 'btn-primary';
    }
  }
}
