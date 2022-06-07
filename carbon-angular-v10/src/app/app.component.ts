import { filter } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  classes: string[] = [];
  sidenavExpanded = false; // Sidenav collapsed by default

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        // Add or remove the class by whether the URL is excluded or not
        // TODO: Make the excluded URLs configurable
        const excludedUrls = [
          '/tutorial',
          '/dashboard/nav'
        ];
        const urlAfterRedirects = (event as NavigationEnd).urlAfterRedirects;
        console.log(urlAfterRedirects);
        const classIndex = this.classes.indexOf('bx--content--no-background');
        if (classIndex === -1 && excludedUrls.includes(urlAfterRedirects)) {
          this.classes.push('bx--content--no-background');
        }
        if (classIndex > -1 && !excludedUrls.includes(urlAfterRedirects)) {
          this.classes.splice(classIndex, 1);
        }
      });
  }

  toggleSidenav(expanded: boolean): void {
    this.sidenavExpanded = expanded;
  }

}
