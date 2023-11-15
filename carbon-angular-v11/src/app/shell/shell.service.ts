import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { THEMES, Theme, Themes } from './shell.type';

@Injectable({
  providedIn: 'root'
})
export class ShellService {

  theme$ = new BehaviorSubject<Theme>('carbon--theme--white');
  themes$ = new BehaviorSubject<Themes>(THEMES);

  public getTheme(): Observable<Theme> {
    return this.theme$.asObservable();
  }

  public setTheme(theme: Theme): void {
    THEMES.forEach(t => {
      if (t.theme === theme) {
        t.active = true
      } else {
        t.active = false;
      }
    });

    this.theme$.next(theme);
    this.themes$.next(THEMES);
  }

  public getThemes(): Observable<Themes> {
    return this.themes$.asObservable();
  }

}
