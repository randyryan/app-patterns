import { Component, HostBinding, Input, OnInit } from '@angular/core';

import { CardAccent, CardAspectRatio, CardBorder } from './card.types';

@Component({
  selector: 'ccc-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() accent?: CardAccent;
  @Input() border?: CardBorder;
  @Input() aspectRatio?: CardAspectRatio;
  @Input() theme?: 'light' | 'dark';

  @Input() heading: string = '';
  

  /**
   * NOTE: Be aware that this project prefers to set classes using [ngClass] on the elements in
   *       component's content and avoid setting them on the host element, this is an exception.
   */
  @HostBinding('class')
  get aspectRatioClass(): string {
    if (this.aspectRatio) {
      const { width, height, golden } = this.aspectRatio;
      if (golden) {
        return `ccc-card--aspect-ratio-golden-${golden}`;
      }
      return `ccc-card--aspect-ratio-${width}x${height}`;
    } else {
      return '';
    }
  }

  classes: string[] = [];

  ngOnInit(): void {
    if (this.accent) {
      const { border, size, color } = this.accent;
      if (Object.keys(this.accent).length === 2) {
        this.classes.push(`ccc-card--accent-${border}-${size}`);
      }
      if (Object.keys(this.accent).length === 3) {
        this.classes.push(`ccc-card--accent-${border}-${size}-${color}`);
      }
    }
    if (this.border) {
      if (this.border === 'condense') {
        this.classes.push('ccc-card--condense-border');
      }
      if (this.border === 'narrow') {
        this.classes.push('ccc-card--narrow-border');
      }
    }
    if (this.theme) {
      this.classes.push(`ccc-card--theme-${this.theme}`);
    }
  }
}
