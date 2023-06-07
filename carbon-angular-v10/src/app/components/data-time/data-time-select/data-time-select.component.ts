import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-time-select',
  templateUrl: './data-time-select.component.html',
  styleUrls: ['./data-time-select.component.scss']
})
export class DataTimeSelectComponent implements OnInit {

  dropdownOpen: boolean = false;
  invalid: boolean = false;

  @Input()
  label: string;
  @Input()
  id: string;

  @Input()
  theme: string;
  @Input()
  inline: boolean = false;
  @Input()
  size: string;
  @Input()
  disabled: boolean = false;
  @Input()
  warn: boolean = false;
  @Input()
  skeleton: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

}
