import { Component, Input } from '@angular/core';

/** Sidebar menu item interface for menu structure */
export interface SidebarMenuItem {
  label: string;
  icon: string;
  active?: boolean;
}

/**
 * PUBLIC_INTERFACE
 * Sidebar single menu item row, uses material icon.
 */
@Component({
  selector: 'app-sidebar-menu-item',
  standalone: true,
  templateUrl: './sidebar-menu-item.component.html',
  styleUrls: ['./sidebar-menu-item.component.css']
})
export class SidebarMenuItemComponent {
  /** Display label for the menu item */
  @Input() label!: string;
  /** Material icon name (e.g. 'dashboard', 'mail', etc) */
  @Input() icon!: string;
  /** Is this menu item the current active/selected one? */
  @Input() active: boolean = false;
}
