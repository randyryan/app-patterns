import { Component, OnInit } from '@angular/core';
import { ListItem } from 'carbon-components-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  items: ListItem[] = [ { content: 'Test', selected: false } ];

  constructor() { }

  ngOnInit(): void {
  }

}
