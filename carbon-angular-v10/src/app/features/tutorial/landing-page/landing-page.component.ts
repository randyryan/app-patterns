import { Component, OnInit } from '@angular/core';
import { ButtonType } from 'carbon-components-angular';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  learnMoreButtonType: ButtonType = "primary";

  constructor() { }

  ngOnInit(): void {
  }

}
