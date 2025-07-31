import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * PUBLIC_INTERFACE
 * @summary
 * Stat card for displaying a single dashboard metric with Material icon, value, and label.
 */
@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
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
