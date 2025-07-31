import { Component, Input, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule, NgIf, NgFor, NgClass } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-bar-chart',
  standalone: true,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
  imports: [CommonModule, NgIf, NgFor, NgClass]
})
/**
 * PUBLIC_INTERFACE
 * @summary
 * Reusable Bar Chart component using Chart.js, supporting Material icon legends and Figma-compliant dashboard theming.
 * 
 * Inputs:
 *   - data: Numeric value array for each bar
 *   - labels: String labels for each bar (e.g. days of week, categories)
 *   - legend: (Optional) Array of {icon: Material icon name, label: string, color: string}
 *   - datasetLabel: (Optional) for Chart.js dataset display
 *   - barColors: (Optional) array of color strings or single color for bars
 * Usage:
 * <app-bar-chart [data]="[14,78,53,32]" [labels]="['Mon','Tue','Wed','Thu']" 
 *   [legend]="[{icon: 'mail', label: 'Messages', color: '#2148c0'}]">
 * </app-bar-chart>
 */
export class BarChartComponent implements AfterViewInit, OnDestroy {
  /** Data for bars (numeric, required) */
  @Input() data: number[] = [];
  /** X-axis labels (required) */
  @Input() labels: string[] = [];
  /** (Optional) Single label string for dataset */
  @Input() datasetLabel: string = '';
  /** Bar colors (array or single color, optional) */
  @Input() barColors: string | string[] = '#2148c0';
  /** (Optional) Legends with material icon, label, and color */
  @Input() legend: { icon: string, label: string, color?: string }[] = [];

  /** (Optional) Height (px) for canvas */
  @Input() height: number = 220;
  /** (Optional) Width (px) for canvas */
  @Input() width: number = 420;

  @ViewChild('barChartCanvas') chartRef!: ElementRef<HTMLCanvasElement>;

  private chart!: any; // will be Chart.js instance

  async ngAfterViewInit() {
    // Dynamically import Chart.js to avoid SSR issues & for minimal bundle
    const Chart = (await import('chart.js/auto')).default;
    const ctx = this.chartRef.nativeElement.getContext('2d');
    this.chart = new Chart(ctx!, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: this.datasetLabel,
          data: this.data,
          backgroundColor: Array.isArray(this.barColors)
            ? this.barColors
            : Array(this.data.length).fill(this.barColors),
          borderRadius: 7
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
              color: '#262e38', display: false
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: '#7e8ea6',
              font: { family: 'Montserrat, Arial, sans-serif', size: 12 }
            },
            grid: {
              color: '#313846', // dark bluish gray grid
            }
          }
        },
        responsive: false,
        maintainAspectRatio: false,
        animation: {
          duration: 600
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
