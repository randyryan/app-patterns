import { Component, Input } from '@angular/core';

import Kpi from './kpi-card.types';

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss']
})
export class KpiCardComponent {

  @Input() kpi!: Kpi

}
