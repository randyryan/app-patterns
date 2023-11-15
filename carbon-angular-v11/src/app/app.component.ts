import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Renderer2, inject } from '@angular/core';
import { pairwise } from 'rxjs';

import { ShellService } from './shell';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  document = inject(DOCUMENT);
  renderer = inject(Renderer2);

  sidenavExpanded = false; // Sidenav collapsed by default

  constructor(private shellService: ShellService) { }

  ngOnInit(): void {
    this.shellService.setTheme('carbon--theme--white'); // To get the pairwise to work
    this.shellService.getTheme()
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

}
