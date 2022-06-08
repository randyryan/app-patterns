import { Component, HostBinding, Input, OnInit } from '@angular/core';

import { CardAccent, CardAspectRatio } from './card.types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() accent?: CardAccent;
  // TODO: Set aspect ratio by @Input().
  @Input() aspectRatio!: CardAspectRatio;
  @Input() heading = '';
  @Input() reverseColor!: boolean;
  @Input() theme?: 'light' | 'dark';

  // XXX: The host element is ideal for applying the padding-top technique for aspect ratio, but this violates
  //      the principle of all styles should be defined for the component's content.
  @HostBinding('class')
  aspectRatioClass = '';

  classes: string[] = [];

  ngOnInit(): void {
    if (this.accent) {
      if (Object.keys(this.accent).length === 2) {
        this.classes.push(`dashboard-card--accent-${this.accent.border}-${this.accent.size}`);
      }
      if (Object.keys(this.accent).length === 3) {
        this.classes.push(`dashboard-card--accent-${this.accent.border}-${this.accent.size}-${this.accent.color}`);
      }
    }
    if (this.theme) {
      this.classes.push(`dashboard-card--theme-${this.theme}`);
    }
  }
}
