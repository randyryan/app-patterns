import { Component, OnInit } from '@angular/core';
import { ThemeService } from './theme.service';
import { Theme, Themes } from './theme.type';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  themes!: Themes;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.getThemes().subscribe(themes => this.themes = themes);
  }

  onChange({ value }: { value: string }): void {
    this.themeService.setTheme(value as Theme);
  }

}
