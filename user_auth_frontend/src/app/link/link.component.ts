import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf, NgClass, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * PUBLIC_INTERFACE
 * @summary Reusable link, can act as a navigation link or as an action button.
 * @description
 * This component renders a styled link (e.g. "Forgot password?") suitable for use within forms.
 * It supports two modes:
 *   - Navigation: via [routerLink], [href] or external url
 *   - Button: executes a click handler, not navigating
 *
 * Style and behavior consistent with Figma and dashboard-login.css (see class "forgot-link").
 */
@Component({
  selector: 'app-link',
  standalone: true,
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css'],
  imports: [NgIf, NgClass, CommonModule, RouterModule]
})
export class LinkComponent {
  /**
   * PUBLIC_INTERFACE
   * The visible link text.
   */
  @Input() text: string = '';

  /**
   * PUBLIC_INTERFACE
   * (Optional) Relative path or URL the link should navigate to. If omitted, acts as button.
   */
  @Input() href?: string;

  /**
   * PUBLIC_INTERFACE
   * If true, link is rendered as a button (with role="button") instead of an anchor.
   * Use for "Forgot password?" actions or where you want (click) handler only.
   */
  @Input() action: boolean = false;

  /**
   * PUBLIC_INTERFACE
   * (Optional) If true, disables the link/button.
   */
  @Input() disabled: boolean = false;

  /**
   * PUBLIC_INTERFACE
   * (Optional) Used for routerLink navigation. If present and not empty, routerLink is used.
   */
  @Input() routerLink?: string;

  /**
   * PUBLIC_INTERFACE
   * Output event when the link/button is clicked. Not triggered if disabled.
   */
  @Output() clicked = new EventEmitter<Event>();

  // Keyboard accessibility: allow pressing Enter/Space for button mode
  onKeydown(e: KeyboardEvent) {
    if ((e.key === 'Enter' || e.key === ' ') && !this.disabled && this.action) {
      e.preventDefault();
      this.handleClick(e);
    }
  }

  // Handle click or button activation
  // PUBLIC_INTERFACE
  handleClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    if (this.action || !this.href && !this.routerLink) {
      // Button-action: emit and prevent default navigation
      event.preventDefault();
      this.clicked.emit(event);
    }
    // For href or routerLink, allow browser navigation (but still emit)
    if (this.href || this.routerLink) {
      this.clicked.emit(event);
    }
  }
}
