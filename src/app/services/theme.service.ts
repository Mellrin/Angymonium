import { Injectable } from '@angular/core';
import { BehaviorSubject, } from 'rxjs';
import { LocalService } from './local.service';

export type THEME = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _themeDark: BehaviorSubject<THEME> = new BehaviorSubject<THEME>(this.localStore.getData('theme') as THEME || 'dark');

  constructor(
    private localStore: LocalService,
  ) { }

  getTheme() {
    return this._themeDark.value === 'dark' ? 'light' : 'dark'
  }

  getIcon() {
    return this._themeDark.value === 'dark' ? 'moon' : 'sun'
  }

  toggleTheme() {
    this._themeDark.next(this.getTheme());
    this.localStore.saveData('theme', this._themeDark.value)
  }

}
