import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DropdownService } from 'carbon-components-angular';

@Component({
  selector: 'app-data-time-select',
  templateUrl: './data-time-select.component.html',
  styleUrls: ['./data-time-select.component.scss']
})
export class DataTimeSelectComponent implements OnInit {

  @ViewChild("listbox", { static: true }) listbox: ElementRef;
  @ViewChild("listboxMenu", { static: false }) listboxMenu: ElementRef;
  @ViewChild("dropdownButton", { static: true }) dropdownButton: ElementRef;
  @ViewChild("dropdownMenu", { static: true }) dropdownMenu: ElementRef;

  dropdownOpen: boolean = false;
  invalid: boolean = false;
  paused: boolean = false;

  outsideClick = this._outsideClick.bind(this);
	outsideKey = this._outsideKey.bind(this);
  keyboardNav = this._keyboardNav.bind(this);

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

  constructor(private elementRef: ElementRef, private dropdownService: DropdownService) { }

  ngOnInit(): void {
  }

  openDropdown(): void {
    this.dropdownOpen = true;
    // this._appendToBody();
    document.addEventListener("click", this.outsideClick, true);
    document.addEventListener("keydown", this.outsideKey, true);
    setTimeout(() => this.listboxMenu.nativeElement.focus(), 0);
  }

  closeDropdown(): void {
    this.dropdownOpen = false;
    this.dropdownButton.nativeElement.focus();
    // this._appendToDropdown();
    document.removeEventListener("click", this.outsideClick, true);
    document.removeEventListener("keydown", this.outsideKey, true);
  }

  toggleDropdown(): void {
    if (this.dropdownOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  togglePause(): void {
    this.paused = !this.paused;
  }

  private _outsideClick(event: any) {
    if (!this.elementRef.nativeElement.contains(event.target) &&
      !this.dropdownMenu.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  private _outsideKey(event: any) {
    if (this.dropdownOpen && event.key === "Tab" && this.dropdownMenu.nativeElement.contains(event.target as Node)) {
      this.closeDropdown();
    }
  }

  private _keyboardNav(event: KeyboardEvent) {
    // "Esc" is an IE specific value
    if ((event.key === "Escape" || event.key === "Esc") && this.dropdownOpen) {
      event.stopImmediatePropagation();  // don't unintentionally close modal if inside of it
    }
    if (event.key === "Escape" || event.key === "Esc") {
      event.preventDefault();
      this.closeDropdown();
      this.dropdownButton.nativeElement.focus();
    } else if (this.dropdownOpen && event.key === "Tab") {
      // this way focus will start on the next focusable item from the dropdown
      // not the top of the body!
      this.dropdownButton.nativeElement.focus();
      this.dropdownButton.nativeElement.dispatchEvent(new KeyboardEvent("keydown", {bubbles: true, cancelable: true, key: "Tab"}));
      this.closeDropdown();
    }
  }

  private _appendToBody() {
    this.dropdownService.appendToBody(
      this.listbox.nativeElement,
      this.dropdownMenu.nativeElement,
      `${this.elementRef.nativeElement.className}${this.dropdownOpen ? " bx--list-box--expanded" : ""}`);
    this.dropdownMenu.nativeElement.addEventListener("keydown", this.keyboardNav, true);
  }

  private _appendToDropdown() {
    this.dropdownService.appendToDropdown(this.elementRef.nativeElement);
    this.dropdownMenu.nativeElement.removeEventListener("keydown", this.keyboardNav, true);
  }

}
