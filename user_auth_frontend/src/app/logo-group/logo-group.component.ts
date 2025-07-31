import { Component, Input } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';

/**
 * PUBLIC_INTERFACE
 * @summary Decorative logo/icon group for top of card, suitable for branding.
 * @description
 * Minimal, modern branding component styled after Figma/dashboard-login.
 * Displays stylable SVG/logo shapes or projected icon content, with CSS variable theming.
 * Intended as a top-of-form/logo group, e.g. at login card top.
 *
 * Usage:
 * <app-logo-group></app-logo-group>
 * or
 * <app-logo-group>
 *   <svg>...</svg> <!-- custom business logo/icon -->
 * </app-logo-group>
 */
@Component({
  selector: 'app-logo-group',
  templateUrl: './logo-group.component.html',
  styleUrls: ['./logo-group.component.css'],
  standalone: true,
  imports: [NgIf, NgStyle],
})
export class LogoGroupComponent {
  /**
   * PUBLIC_INTERFACE
   * Optional flag to use default Figma-style "abstract" SVG group (if no content is projected)
   */
  @Input() showDefault: boolean = true;

  /**
   * PUBLIC_INTERFACE
   * Optionally allow consumer to override main logo color via CSS variable
   * e.g. <app-logo-group style="--logo-main: #FF00CC"></app-logo-group>
   */
  @Input() logoColor?: string;
}
