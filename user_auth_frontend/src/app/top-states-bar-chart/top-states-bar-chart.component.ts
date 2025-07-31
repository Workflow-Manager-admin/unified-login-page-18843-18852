import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';

/**
 * PUBLIC_INTERFACE
 * @summary
 * Displays a horizontal grouped bar chart using Chart.js, showing "Top States" and their metrics.
 * Used for dashboard bottom layout, styled for dark Figma/Material design.
 *
 * Inputs:
 *   - topStatesData: Array of { state: string; metrics: Record<string, number> }
 *     e.g. [
 *       { state: 'California', metrics: { clients: 35, visits: 120 }},
 *       ...
 *     ]
 *   - metrics: Array of metric labels to show per state (order = grouping); required for multi-metric/group.
 *   - colors: Optional: Array of CSS colors for bar metrics (indexed by metric).
 */
@Component({
  selector: 'app-top-states-bar-chart',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './top-states-bar-chart.component.html',
  styleUrls: ['./top-states-bar-chart.component.css']
})
export class TopStatesBarChartComponent implements AfterViewInit, OnDestroy {
  /** Input: List of top states, each with one-or-more metric values */
  @Input() topStatesData: { state: string; metrics: Record<string, number> }[] = [];
  /** Input: Metric keys (order), e.g. ['clients', 'sales'] */
  @Input() metrics: string[] = [];
  /** Input: Label for each metric key */
  @Input() metricLabels: { [k: string]: string } = {};
  /** Input: Color palette for bars per metric */
  @Input() colors: string[] = ['#8ba3e9', '#62e0c7', '#ffd166', '#d8657d', '#a08bfd'];

  @Input() height: number = 240;
  @Input() width: number = 560;

  @ViewChild('canvas') chartRef!: ElementRef<HTMLCanvasElement>;

  private chart: any;

  async ngAfterViewInit() {
    if (!this.topStatesData?.length || !this.metrics?.length) return;
    // Dynamically load Chart.js
    const Chart = (await import('chart.js/auto')).default;

    const ctx = this.chartRef.nativeElement.getContext('2d');
    // Compose Chart.js datasets for horizontal grouped display
    const states = this.topStatesData.map(d => d.state);
    const chartDatasets = this.metrics.map((m, idx) => ({
      label: this.metricLabels[m] || m,
      data: this.topStatesData.map(d => d.metrics?.[m] ?? 0),
      backgroundColor: this.colors[idx % this.colors.length],
      maxBarThickness: 23,
      borderRadius: 7,
      borderSkipped: false,
    }));

    this.chart = new Chart(ctx!, {
      type: 'bar',
      data: {
        labels: states,
        datasets: chartDatasets
      },
      options: {
        indexAxis: 'y',
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'start',
            labels: {
              color: '#8ba3e9',
              font: { family: "'Montserrat', Arial, sans-serif", size: 15 }
            }
          },
          tooltip: {
            backgroundColor: '#232b36',
            titleColor: '#e3e7ee',
            bodyColor: '#b5c4e2'
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              color: '#28394a44'
            },
            ticks: {
              color: '#7e8ea6',
              font: { family: "'Montserrat', Arial, sans-serif", size: 13 }
            }
          },
          y: {
            grid: { display: false },
            ticks: {
              color: '#e3e7ee',
              font: { family: "'Montserrat', Arial, sans-serif", size: 14, weight: 'bold' }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 650 },
      }
    });
    this.chart.resize();
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
