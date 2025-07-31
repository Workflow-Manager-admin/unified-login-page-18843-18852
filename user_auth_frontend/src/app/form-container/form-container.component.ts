import { Component, HostBinding } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * @summary
 * A minimal, reusable form/card container for modal-like flows such as authentication.
 * Applies light, modern, minimal styles, border radius, padding, and subtle elevation.
 * Content is projected for form fields, buttons, etc.
 * Uses theme variables from design tokens / dashboard-login.css.
 */
@Component({
  selector: 'app-form-container',
  standalone: true,
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css']
})
export class FormContainerComponent {
  /**
   * Attach host class for easy theming.
   */
  @HostBinding('class') hostClass = 'form-container-root';
}
