import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-shell-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  @HostBinding('class.cds--side-nav') cdsSidenav = true;

  @Input()
  expanded!: boolean;

}
