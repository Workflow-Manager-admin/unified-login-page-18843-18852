import { Component, Input } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * @summary
 * Stat card for displaying a single dashboard metric with Material icon, value, and label.
 * @description
 * Reusable standalone component for summary metric cards (clients, notifications, etc).
 * Inputs:
 *   - icon: Material icon name ('people', 'notifications', etc)
 *   - value: string | number (main metric value)
 *   - label: string (metric label)
 * Applies Figma token-based styling: elevation, spacing, rounded corners, spacing, layout.
 * Example Usage:
 * <app-stat-card icon="people" value="128" label="Clients"></app-stat-card>
 */
@Component({
  selector: 'app-stat-card',
  standalone: true,
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.css']
})
export class StatCardComponent {
  /**
   * PUBLIC_INTERFACE
   * Name of Material icon (e.g. 'people', 'notifications', 'report', 'assignment_turned_in')
   */
  @Input() icon: string = ''; // Material icon name

  /**
   * PUBLIC_INTERFACE
   * Main value (number or short string)
   */
  @Input() value: string | number = '';

  /**
   * PUBLIC_INTERFACE
   * Text label for the metric
   */
  @Input() label: string = '';
}
