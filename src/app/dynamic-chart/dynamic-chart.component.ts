import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-performance-dynamic-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-chart.component.html',
  styleUrls: ['./dynamic-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicChartComponent implements AfterViewInit {
  @ViewChild('cnt', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;

  private cdr = inject(ChangeDetectorRef);

  async ngAfterViewInit(): Promise<void> {
    await this.createChart();
  }

  private async createChart(): Promise<void> {
    const esm = await import('../charts/chart/chart.component');
    const chartRef = this.viewContainerRef.createComponent(esm.ChartComponent);
    this.cdr.markForCheck();
  }
}
