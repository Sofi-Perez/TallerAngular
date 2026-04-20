import { Component, OnInit } from '@angular/core';
import { Serie } from '../serie';
import { SeriesService } from '../series.service';

@Component({
  selector: 'app-series-list',
  standalone: false,
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {
  series: Array<Serie> = [];

  constructor(private seriesService: SeriesService) {}

  getSeriesList(): void {
    this.seriesService.getSeries().subscribe((data) => {
      this.series = data;
      console.log('Series cargadas:', this.series);
    });
  }

  ngOnInit(): void {
    this.getSeriesList();
  }
}