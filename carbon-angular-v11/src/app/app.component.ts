import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  sidenavExpanded = false; // Sidenav collapsed by default

  constructor() {
  }

  toggleSidenav(expanded: boolean): void {
    this.sidenavExpanded = expanded;
  }

}
