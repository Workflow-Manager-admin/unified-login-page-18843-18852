import { Component } from '@angular/core';
import { SidebarAvatarComponent } from './sidebar-avatar.component';
import { SidebarMenuComponent } from './sidebar-menu.component';

/**
 * PUBLIC_INTERFACE
 * Sidebar navigation component.
 * Renders a user avatar at the top, followed by a Material icons-powered menu.
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarAvatarComponent, SidebarMenuComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {}
