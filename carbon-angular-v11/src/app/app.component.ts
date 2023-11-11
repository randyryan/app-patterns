import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Renderer2, inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  document = inject(DOCUMENT);
  renderer = inject(Renderer2);
  theme = "cds--theme--g10";

  sidenavExpanded = false; // Sidenav collapsed by default

  constructor() {
  }

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, this.theme);
  }

  toggleSidenav(expanded: boolean): void {
    this.sidenavExpanded = expanded;
  }

}
