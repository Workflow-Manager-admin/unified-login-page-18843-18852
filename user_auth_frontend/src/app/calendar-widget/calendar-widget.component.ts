import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgFor, NgClass, DatePipe } from '@angular/common';

/**
 * PUBLIC_INTERFACE
 * @summary
 * Material-styled standalone calendar widget,
 * with month/year navigation and clickable day cells.
 */
@Component({
  selector: 'app-calendar-widget',
  standalone: true,
  imports: [CommonModule, NgFor, NgClass, DatePipe],
  templateUrl: './calendar-widget.component.html',
  styleUrls: ['./calendar-widget.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarWidgetComponent {
  /** PUBLIC_INTERFACE: Month (0-based; 0=Jan, 11=Dec); defaults to today */
  @Input() month?: number;
  /** PUBLIC_INTERFACE: Full year (e.g., 2024); defaults to today */
  @Input() year?: number;
  /** PUBLIC_INTERFACE: Currently selected day (full Date), optional */
  @Input() selected?: Date | null;

  /** PUBLIC_INTERFACE: Emits selected day (Date) when clicked */
  @Output() daySelected = new EventEmitter<Date>();

  /** Internal state tracks month/year */
  get currentMonth(): number {
    return this.month !== undefined ? this.month : this.today.getMonth();
  }
  get currentYear(): number {
    return this.year !== undefined ? this.year : this.today.getFullYear();
  }

  today = new Date();

  /** Material full month names */
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  /** Day-of-week labels, start Monday */
  weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  /**
   * Build 6 weeks grid (42 cells), each is { date: Date|null, inMonth: boolean }
   */
  get daysGrid(): { date: Date|null, inMonth: boolean, isToday: boolean, isSelected: boolean }[] {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    // Week starts (Monday=0 in grid, but getDay() Sunday=0)
    const firstDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // Mon=0, ..., Sun=6

    const daysInMonth = new Date(this.currentYear, this.currentMonth+1, 0).getDate();
    const prevMonth = (this.currentMonth - 1 + 12) % 12;
    const prevMonthYear = this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
    const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();

    const grid: { date: Date|null, inMonth: boolean, isToday: boolean, isSelected: boolean }[] = [];
    // Previous month's last days to fill start-of-first-week (if needed)
    for (let i = 0; i < firstDayOfWeek; i++) {
      const d = daysInPrevMonth - firstDayOfWeek + i + 1;
      const dayDate = new Date(prevMonthYear, prevMonth, d);
      grid.push({
        date: dayDate, inMonth: false,
        isToday: this.isToday(dayDate),
        isSelected: this.isSelected(dayDate)
      });
    }
    // Days of current month
    for (let d=1; d<=daysInMonth; d++) {
      const dayDate = new Date(this.currentYear, this.currentMonth, d);
      grid.push({
        date: dayDate, inMonth: true,
        isToday: this.isToday(dayDate),
        isSelected: this.isSelected(dayDate)
      });
    }
    // Next month days to fill cells to 42 (6 rows x 7)
    while (grid.length < 42) {
      const d = grid.length - (firstDayOfWeek + daysInMonth) + 1;
      const nextMonth = (this.currentMonth + 1) % 12;
      const nextMonthYear = this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
      const dayDate = new Date(nextMonthYear, nextMonth, d);
      grid.push({
        date: dayDate, inMonth: false,
        isToday: this.isToday(dayDate),
        isSelected: this.isSelected(dayDate)
      });
    }
    return grid;
  }

  /** Go one month back */
  prevMonth() {
    let newMonth = this.currentMonth - 1, newYear = this.currentYear;
    if (newMonth < 0) { newMonth = 11; newYear--; }
    this.month = newMonth;
    this.year = newYear;
  }
  /** Go one month forward */
  nextMonth() {
    let newMonth = this.currentMonth + 1, newYear = this.currentYear;
    if (newMonth > 11) { newMonth = 0; newYear++; }
    this.month = newMonth;
    this.year = newYear;
  }

  /** Checks if a date is today (local) */
  private isToday(date: Date): boolean {
    const now = this.today;
    return date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
  }
  /** Checks if this is the selected date (full day precision) */
  private isSelected(date: Date): boolean {
    if (!this.selected) return false;
    return date.getDate() === this.selected.getDate() &&
      date.getMonth() === this.selected.getMonth() &&
      date.getFullYear() === this.selected.getFullYear();
  }

  // PUBLIC_INTERFACE
  /** Handles clicking on a day; emits only for inMonth=true */
  onDayClick(day: { date: Date|null, inMonth: boolean }) {
    if (day && day.date && day.inMonth) {
      this.daySelected.emit(day.date);
    }
  }
}
