import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';

/**
 * PUBLIC_INTERFACE
 * @summary
 * A modern, minimal dashboard list row for user or comment lists.
 * Shows user's avatar (circular), name, subtitle (e.g., role/status/location), and a Material action icon menu (<mat-icon>more_vert</mat-icon>).
 * Designed for dashboard activity and comments lists.
 *
 * Inputs:
 *   - avatarUrl: string | user's avatar/image URL
 *   - name: string | display name
 *   - subtitle: string | extra info/status/role (smaller)
 * Outputs:
 *   - actionClicked: emits when action menu/icon is clicked
 * 
 * Usage Example:
 * <app-user-list-row
 *   [avatarUrl]="u.avatar"
 *   [name]="u.name"
 *   [subtitle]="u.location"
 *   (actionClicked)="onUserAction(u)">
 * </app-user-list-row>
 */
@Component({
  selector: 'app-user-list-row',
  standalone: true,
  imports: [NgIf],
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
