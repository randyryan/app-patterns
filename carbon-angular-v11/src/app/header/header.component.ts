import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { IconService } from 'carbon-components-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @HostBinding('class.cds--header') headerClass = true;

  @Input()
  hamburgerActivated!: boolean;
  @Output()
  hamburgerSelected = new EventEmitter<boolean>();

  toggleHamburger($event: Object): void {
    this.hamburgerActivated = !this.hamburgerActivated;
    this.hamburgerSelected.emit(this.hamburgerActivated);
  }

}
