import { Component, HostBinding, Input, OnInit } from '@angular/core';

import { CardAccent, CardAspectRatio } from './card.types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() accent?: CardAccent;
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
        return `dashboard-card--aspect-ratio-golden-${golden}`;
      }
      return `dashboard-card--aspect-ratio-${width}x${height}`;
    } else {
      return '';
    }
  }

  classes: string[] = [];

  ngOnInit(): void {
    if (this.accent) {
      const { border, size, color } = this.accent;
      if (Object.keys(this.accent).length === 2) {
        this.classes.push(`dashboard-card--accent-${border}-${size}`);
      }
      if (Object.keys(this.accent).length === 3) {
        this.classes.push(`dashboard-card--accent-${border}-${size}-${color}`);
      }
    }
    if (this.theme) {
      this.classes.push(`dashboard-card--theme-${this.theme}`);
    }
  }
}
