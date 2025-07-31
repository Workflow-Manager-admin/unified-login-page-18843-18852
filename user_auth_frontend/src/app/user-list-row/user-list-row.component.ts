import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

/**
 * PUBLIC_INTERFACE
 * @summary
 * A modern, minimal dashboard list row for user or comment lists.
 */
@Component({
  selector: 'app-user-list-row',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './user-list-row.component.html',
  styleUrls: ['./user-list-row.component.css'],
})
export class UserListRowComponent {
  /** PUBLIC_INTERFACE: User avatar image URL (required) */
  @Input() avatarUrl: string = '';

  /** PUBLIC_INTERFACE: User name (required) */
  @Input() name: string = '';

  /** PUBLIC_INTERFACE: Subtitle (status, location, role, etc; optional) */
  @Input() subtitle?: string;

  /** PUBLIC_INTERFACE: Emits when menu (more_vert) button is clicked */
  @Output() actionClicked = new EventEmitter<Event>();

  // PUBLIC_INTERFACE
  onActionClick(event: Event) {
    this.actionClicked.emit(event);
  }
}
