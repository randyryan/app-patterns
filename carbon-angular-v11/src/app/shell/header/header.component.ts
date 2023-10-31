import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shell-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @HostBinding('class.cds--header') cdsHeader = true;

  @Input()
  hamburgerActivated: boolean = false;
  @Output()
  hamburgerSelected = new EventEmitter<boolean>();

  toggleHamburger($event: Object): void {
    this.hamburgerSelected.emit(this.hamburgerActivated = !this.hamburgerActivated);
  }

}
