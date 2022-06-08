import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';

import { CardComponent } from '../card/card.component';

import Kpi from './kpi-card.types';

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss']
})
export class KpiCardComponent implements AfterViewInit {

  @Input() kpi!: Kpi
  @ViewChild(CardComponent) card!: CardComponent;

  ngAfterViewInit(): void {
    this.card.classes.push(' dashboard-card--aspect-ratio-square');
    this.card.aspectRatioClass = 'dashboard-card--aspect-ratio-square';
  }

}
