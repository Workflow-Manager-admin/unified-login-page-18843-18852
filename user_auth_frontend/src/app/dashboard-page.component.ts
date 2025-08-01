import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StatCardComponent } from './stat-card/stat-card.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { CalendarWidgetComponent } from './calendar-widget/calendar-widget.component';
import { UserListRowComponent } from './user-list-row/user-list-row.component';
import { DividerComponent } from './divider/divider.component';
import { TopStatesBarChartComponent } from './top-states-bar-chart/top-states-bar-chart.component';

/**
 * PUBLIC_INTERFACE
 * @summary Dashboard main page: assembles sidebar, stat cards, bar chart, calendar, user list, and dividers, matching Figma/Material layout.
 * Mock data is used for demonstration.
 */
@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    SidebarComponent,
    StatCardComponent,
    BarChartComponent,
    CalendarWidgetComponent,
    UserListRowComponent,
    DividerComponent,
    TopStatesBarChartComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent {
  // Sample data for stat cards
  statCards = [
    { icon: 'people', value: 128, label: 'Clients' },
    { icon: 'notifications', value: 2, label: 'Notifications' },
    { icon: 'report', value: 4, label: 'Reports' },
    { icon: 'assignment_turned_in', value: 32, label: 'Completed Tasks' },
  ];

  // Sales line chart sample (chart.js/Material accent colors used for legend + line)
  barChartData = {
    data: [14, 78, 53, 32, 90, 44, 67],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    legend: [
      { icon: 'show_chart', label: 'Sales', color: '#8ba3e9' }
    ],
    datasetLabel: 'Sales',
  };

  // Mock data for "Top States" widget: state name, metrics
  topStatesData = [
    { state: 'California', metrics: { clients: 35 } },
    { state: 'Texas', metrics: { clients: 27 } },
    { state: 'Florida', metrics: { clients: 20 } },
    { state: 'New York', metrics: { clients: 15 } },
    { state: 'Illinois', metrics: { clients: 12 } }
  ];
  metrics = ['clients'];
  metricLabels = { clients: 'Clients' };
  metricColors = ['#8ba3e9'];

  // Sample users for "New Clients/Activity" section
  users = [
    {
      avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
      name: 'Nicci Troiani',
      subtitle: 'Chicago, IL',
    },
    {
      avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      name: 'George Fields',
      subtitle: 'New York, NY',
    },
    {
      avatarUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
      name: 'Jones Dermot',
      subtitle: 'San Francisco, CA',
    },
    {
      avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
      name: 'Jane Doe',
      subtitle: 'New York, NY',
    },
  ];
}
