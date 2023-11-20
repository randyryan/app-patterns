import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Renderer2, inject } from '@angular/core';
import { pairwise } from 'rxjs';

import { ThemeService, Themes } from './theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  themes!: Themes;

  document = inject(DOCUMENT);
  renderer = inject(Renderer2);

  sidenavExpanded = false; // Sidenav collapsed by default
  panelExpanded = false;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.getThemes().subscribe(themes => this.themes = themes);

    this.themeService.setTheme('cds--theme--white'); // To get the pairwise to work
    this.themeService.getTheme()
      .pipe(pairwise())
      .subscribe(([oldTheme, newTheme]) => {
        this.renderer.addClass(this.document.body, newTheme);
        if (oldTheme !== newTheme) {
          this.renderer.removeClass(this.document.body, oldTheme);
        }
      });
  }

  toggleSidenav(expanded: boolean): void {
    this.sidenavExpanded = expanded;
  }

  togglePanel(expanded: boolean): void {
    this.panelExpanded = expanded;
  }

}
