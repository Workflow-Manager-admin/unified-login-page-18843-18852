import { Component, Input, HostBinding } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * @summary
 * Minimal, modern horizontal divider component for section separation.
 * Supports optional spacing, color (defaults to dashboard border tone), and margin.
 * Usage:
 * <app-divider></app-divider>
 * <app-divider margin="xl"></app-divider>
 * <app-divider color="#e0e8fb"></app-divider>
 */
@Component({
  selector: 'app-divider',
  standalone: true,
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.css'],
})
export class DividerComponent {
  /**
   * PUBLIC_INTERFACE
   * Divider color (CSS color string, optional). Defaults to dashboard border color.
   */
  @Input() color?: string;

  /**
   * PUBLIC_INTERFACE
   * Margin preset: 'none' | 'sm' | 'md' | 'lg' | 'xl'.
   * - 'sm': 8px, 'md': 16px, 'lg': 28px, 'xl': 40px (vertical only)
   * Default is 'md'.
   */
  @Input() margin: 'none' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @HostBinding('class') get hostClass(): string {
    return `divider-root margin-${this.margin}`;
  }

  /** Inline style for custom color */
  get style() {
    return {
      '--divider-color': this.color || null,
    };
  }
}
