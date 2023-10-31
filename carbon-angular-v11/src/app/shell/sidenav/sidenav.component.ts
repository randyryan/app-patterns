import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-shell-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  @HostBinding('class.cds--side-nav')
  cdsSidenav: boolean = true;

  @HostBinding('class.cds--side-nav--expanded')
  @Input()
  expanded: boolean = false;

}
