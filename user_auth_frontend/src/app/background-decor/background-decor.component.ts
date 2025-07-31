import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

/**
 * PUBLIC_INTERFACE
 * @summary
 * Reusable decorative background shapes for the dashboard/login page.
 * Matches Figma/bg asset using styled divs/SVG, following .dashboard-background and .bg-ellipse, .bg-vector, etc from dashboard-login.css.
 * Place this component at app-root or any container; shapes are absolutely positioned, do not block interaction.
 */
@Component({
  selector: 'app-background-decor',
  standalone: true,
  imports: [NgClass],
  templateUrl: './background-decor.component.html',
  styleUrls: ['./background-decor.component.css'],
})
export class BackgroundDecorComponent {
  /**
   * PUBLIC_INTERFACE
   * If true, uses full-sized background (default). Otherwise, adapts to parent size.
   */
  @Input() fullScreen: boolean = true;
}
