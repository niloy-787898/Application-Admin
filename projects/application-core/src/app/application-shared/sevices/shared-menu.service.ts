// shared-menu.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SharedMenuService {
  private activeMenuSubject = new BehaviorSubject<string | null>(null);
  private activeAccordianSubject = new BehaviorSubject<string | null>(null);

  setActiveMenu(menu: string | null) {
    this.activeMenuSubject.next(menu);
  }

  getActiveMenu(): Observable<string | null> {
    return this.activeMenuSubject.asObservable();
  }
  setActiveAccordian(accordian: string | null) {
    this.activeAccordianSubject.next(accordian);
  }

  getActiveAccordian(): Observable<string | null> {
    return this.activeAccordianSubject.asObservable();
  }

  constructor() {}

}
