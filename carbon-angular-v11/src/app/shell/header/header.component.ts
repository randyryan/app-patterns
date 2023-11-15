import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { ShellService } from '../shell.service';
import { Theme, Themes } from '../shell.type';

@Component({
  selector: 'app-shell-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @HostBinding('class.cds--header') cdsHeader = true;

  @Input()
  hamburgerActivated: boolean = false;
  @Output()
  hamburgerSelected = new EventEmitter<boolean>();

  themes!: Themes;

  constructor(private shellService: ShellService) { }

  ngOnInit(): void {
    this.shellService.getThemes()
      .subscribe(themes => this.themes = themes);
  }

  toggleHamburger($event: Object): void {
    this.hamburgerSelected.emit(this.hamburgerActivated = !this.hamburgerActivated);
  }

  selectTheme(theme: Theme): void {
    this.shellService.setTheme(theme);
  }

  click($event: Event): void {
    console.error($event);
  }

}
