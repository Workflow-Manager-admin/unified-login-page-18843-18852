import { Component, Input, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-bar-chart',
  standalone: true,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
  imports: [CommonModule, NgIf, NgFor]
})
/**
 * PUBLIC_INTERFACE
 * @summary
 * Reusable Line Chart component using Chart.js for sales, supporting Material icon legends and Figma/Material dashboard theming.
 *
 * Inputs:
 *   - data: Numeric value array for each point
 *   - labels: String labels for each point (e.g. days of week)
 *   - legend: (Optional) Array of {icon: Material icon name, label: string, color: string}
 *   - datasetLabel: (Optional) for Chart.js dataset display
 * Usage:
 * <app-bar-chart [data]="[14,78,53,32]" [labels]="['Mon','Tue','Wed','Thu']"
 *   [legend]="[{icon: 'show_chart', label: 'Sales', color: '#8ba3e9'}]">
 * </app-bar-chart>
 */
export class BarChartComponent implements AfterViewInit, OnDestroy {
  /** Data for line points (numeric, required) */
  @Input() data: number[] = [];
  /** X-axis labels (required) */
  @Input() labels: string[] = [];
  /** (Optional) Single label string for dataset */
  @Input() datasetLabel: string = '';
  /** (Optional) Material icon, label, color for legend */
  @Input() legend: { icon: string, label: string, color?: string }[] = [];

  /** (Optional) Height (px) for canvas */
  @Input() height: number = 220;
  /** (Optional) Width (px) for canvas */
  @Input() width: number = 420;

  @ViewChild('barChartCanvas') chartRef!: ElementRef<HTMLCanvasElement>;

  private chart!: any; // Chart.js instance

  async ngAfterViewInit() {
    // Dynamically import Chart.js to avoid SSR issues & minimal bundle
    const Chart = (await import('chart.js/auto')).default;
    const ctx = this.chartRef.nativeElement.getContext('2d');
    // Use Material dark palette
    const mainLineColor = '#8ba3e9'; // accent blue
    const backgroundGradient = (() => {
      if (ctx) {
        const grad = ctx.createLinearGradient(0, 0, 0, this.height);
        grad.addColorStop(0, 'rgba(139,163,233,0.27)');
        grad.addColorStop(1, 'rgba(139,163,233,0.07)');
        return grad;
      }
      return 'rgba(139,163,233,0.12)';
    })();

    this.chart = new Chart(ctx!, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: this.datasetLabel,
          data: this.data,
          fill: true,
          cubicInterpolationMode: 'monotone',
          tension: 0.38,
          pointRadius: 5,
          pointBackgroundColor: mainLineColor,
          borderColor: mainLineColor,
          backgroundColor: backgroundGradient,
          borderWidth: 3,
          pointBorderColor: '#232b36',
          pointHoverBorderColor: '#e3e7ee',
          pointHoverBackgroundColor: '#e3e7ee',
          pointHoverRadius: 8,
        }]
      },
      options: {
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            ticks: {
              color: '#b5c4e2',
              font: { family: 'Montserrat, Arial, sans-serif', size: 13, weight: 500 }
            },
            grid: {
              color: '#262e38',
              display: false
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: '#7e8ea6',
              font: { family: 'Montserrat, Arial, sans-serif', size: 12 }
            },
            grid: {
              color: '#313846',
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 650 },
      }
    });
    // Resize (responsive): set canvas to 100% width/height of container
    this.chart.resize();
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
