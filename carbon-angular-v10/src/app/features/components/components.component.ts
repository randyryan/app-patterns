import { Component, OnInit } from '@angular/core';
import Kpi from 'src/app/components/kpi-card/kpi-card.types';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {

  kpi: Kpi = {
    name: 'Fire',
    icon: 'Fire',
    type: 'number',
    value: 0
  };

  constructor() { }

  ngOnInit(): void {
  }

}
