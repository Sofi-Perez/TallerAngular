import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Serie } from '../serie';
import { SeriesService } from '../series.service';

@Component({
  selector: 'app-series-list',
  standalone: false,
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {
  series: Serie[] = [];
  selectedSerie: Serie | null = null;
  averageSeasons: number = 0;

  constructor(
    private seriesService: SeriesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('Entró a ngOnInit');

    this.seriesService.getSeries().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.series = [...data];
        this.selectedSerie = this.series.length > 0 ? this.series[0] : null;
        this.calculateAverage();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error HTTP:', error);
      }
    });
  }

  onSelected(serie: Serie): void {
    this.selectedSerie = serie;
  }

  calculateAverage(): void {
    if (this.series.length === 0) {
      this.averageSeasons = 0;
      return;
    }

    const total = this.series.reduce((sum, serie) => sum + serie.seasons, 0);
    this.averageSeasons = total / this.series.length;
  }
}