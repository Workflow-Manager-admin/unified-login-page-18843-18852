import { Component } from '@angular/core';
import { SidebarMenuItemComponent, SidebarMenuItem } from './sidebar-menu-item.component';

/**
 * PUBLIC_INTERFACE
 * Sidebar menu list, powered by Material icons.
 */
@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [SidebarMenuItemComponent],
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent {
  /** The sidebar's main menu items (icon is Material icon name) */
  menuItems: SidebarMenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', active: true },
    { label: 'Messages', icon: 'mail', active: false },
    { label: 'My Tasks', icon: 'assignment', active: false },
    { label: 'Clients', icon: 'people', active: false },
    { label: 'Integrations', icon: 'add_box', active: false }
  ];
}
