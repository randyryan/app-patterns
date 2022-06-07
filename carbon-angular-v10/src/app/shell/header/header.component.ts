import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @HostBinding('class.bx--header') headerClass = true;

  @Input()
  hamburgerActivated!: boolean;
  @Output()
  hamburgerSelected = new EventEmitter<boolean>();

  toggleExpansion($event: Object): void {
    this.hamburgerActivated = !this.hamburgerActivated;
    this.hamburgerSelected.emit(this.hamburgerActivated);
  }

}
